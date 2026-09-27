import { ref, onMounted, onUnmounted } from 'vue'

const notes = ref([])

export function useNotes() {
  const loadNotes = () => {
    if (typeof window === 'undefined') return []
    try {
      const data = localStorage.getItem('notes')
      notes.value = data ? JSON.parse(data) : []
    } catch (e) {
      //console.error('Error loading notes from localStorage:', e)
      notes.value = []
    }
    return notes.value
  }

  const persistAndNotify = (updatedList) => {
    notes.value = updatedList
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('notes', JSON.stringify(updatedList))
      } catch (e) {
        //console.error('Error saving notes to localStorage:', e)
      }
      window.dispatchEvent(new CustomEvent('updated-notes'))
    }
  }

  const saveNote = ({ book, chapter, verses, text, title, content, color = '#f3dfc8' }) => {
    loadNotes()
    const sortedVerses = Array.isArray(verses)
      ? [...verses].map(Number).filter(n => !isNaN(n) && n > 0).sort((a, b) => a - b)
      : [Number(verses)].filter(n => !isNaN(n) && n > 0)

    const newNote = {
      id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `note_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      book: String(book).toLowerCase().trim(),
      chapter: Number(chapter),
      verses: sortedVerses.length > 0 ? sortedVerses : [1],
      text: text || '',
      title: title ? title.trim() : '',
      content: content ? content.trim() : '',
      color: color || '#f3dfc8',
      pinned: false,
      date: Date.now()
    }

    const updated = [newNote, ...notes.value]
    persistAndNotify(updated)
    return newNote
  }

  const updateNote = (id, updatedFields) => {
    loadNotes()
    const updated = notes.value.map(note => {
      if (note.id === id) {
        return {
          ...note,
          ...updatedFields,
          updatedAt: Date.now()
        }
      }
      return note
    })
    persistAndNotify(updated)
  }

  const deleteNote = (id) => {
    loadNotes()
    const updated = notes.value.filter(note => note.id !== id)
    persistAndNotify(updated)
  }

  const togglePin = (id) => {
    loadNotes()
    const updated = notes.value.map(note => {
      if (note.id === id) {
        return { ...note, pinned: !note.pinned }
      }
      return note
    })
    persistAndNotify(updated)
  }

  const getNotesForChapter = (book, chapter) => {
    loadNotes()
    const b = String(book).toLowerCase().trim()
    const chapNum = Number(chapter)
    return notes.value.filter(n => String(n.book).toLowerCase().trim() === b && Number(n.chapter) === chapNum)
  }

  const getNotesForVerse = (book, chapter, verseNum) => {
    loadNotes()
    const b = String(book).toLowerCase().trim()
    const chapNum = Number(chapter)
    const vNum = Number(verseNum)
    return notes.value.filter(n => 
      String(n.book).toLowerCase().trim() === b && 
      Number(n.chapter) === chapNum && 
      Array.isArray(n.verses) && 
      n.verses.map(Number).includes(vNum)
    )
  }

  const handleSyncEvent = () => {
    loadNotes()
  }

  if (typeof window !== 'undefined') {
    loadNotes()
  }

  onMounted(() => {
    loadNotes()
    if (typeof window !== 'undefined') {
      window.addEventListener('updated-notes', handleSyncEvent)
      window.addEventListener('storage', handleSyncEvent)
    }
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('updated-notes', handleSyncEvent)
      window.removeEventListener('storage', handleSyncEvent)
    }
  })

  return {
    notes,
    loadNotes,
    saveNote,
    updateNote,
    deleteNote,
    togglePin,
    getNotesForChapter,
    getNotesForVerse
  }
}

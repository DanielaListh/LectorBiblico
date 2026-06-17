import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

export function useHighlight(data) {
  const route = useRoute()

  const highlighterMenu = ref({
    visible: false,
    verses: [],
    x: 0,
    y: 0
  })

  const highlightColors = [
    'transparent',
    '#d8c3a6',
    '#dcc16b',
    '#ca7f56',
    '#994d2c',
    '#9baa5e',
    '#54523a',
    '#734f3a'
  ]

  const obtainSelectedVerses = () => {
    const selection = window.getSelection()
    if (!selection.rangeCount) return []

    const range = selection.getRangeAt(0)
    const verses = [...document.querySelectorAll('.verse')]

    const selected = verses.filter((v) => {
      const rect = v.getBoundingClientRect()
      const selRect = range.getBoundingClientRect()

      return !(rect.bottom < selRect.top || rect.top > selRect.bottom)
    })

    return selected.map((v) => Number(v.dataset.vers))
  }

  const openHighlighterMenu = (verses) => {
    const selection = window.getSelection()
    if (!selection.rangeCount) return

    const rect = selection.getRangeAt(0).getBoundingClientRect()

    highlighterMenu.value = {
      visible: true,
      verses,
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY - 50
    }
  }

  const closeHighlighterMenu = () => {
    highlighterMenu.value.visible = false
  }

  const handleSelection = () => {
    const selection = window.getSelection()
    const text = selection.toString().trim()
    if (!text) return

    const verses = obtainSelectedVerses()
    if (verses.length === 0) return

    openHighlighterMenu(verses)
  }

  const saveHighlight = (verses, color) => {
    const actualBook = route.params.book
    const actualChapter = Number(route.params.chapter)

    const rangeText = verses.map((v) => data.value.verses[v - 1]).join('')

    const newItem = {
      id: crypto.randomUUID(),
      book: actualBook,
      chapter: actualChapter,
      verses,
      color,
      text: rangeText,
      date: Date.now()
    }

    const stored = JSON.parse(localStorage.getItem('highlights') || '[]')

    if (color === 'transparent') {
      const filtered = stored.filter(
        (h) =>
          !(
            h.book === actualBook &&
            h.chapter === actualChapter &&
            JSON.stringify(h.verses) === JSON.stringify(verses)
          )
      )
      localStorage.setItem('highlights', JSON.stringify(filtered))
      return
    }

    stored.push(newItem)
    localStorage.setItem('highlights', JSON.stringify(stored))
  }

  const colorSelect = (color) => {
    saveHighlight(highlighterMenu.value.verses, color)
    emitHighlight()
    closeHighlighterMenu()
  }

  const verseHighlight = (numVers, text) => {
    const highlights = JSON.parse(localStorage.getItem('highlights') || '[]')

    const actualBook = route.params.book
    const actualChapter = Number(route.params.chapter)

    const delChapter = highlights.filter(
      (h) => h.book === actualBook && h.chapter === actualChapter
    )

    const match = delChapter.find((h) => h.verses.includes(numVers))

    if (!match) return text

    return `<mark style="background:${match.color}; padding:2px; border-radius:4px;">${text}</mark>`
  }

  const emitHighlight = () => {
    window.dispatchEvent(new Event('updated-results'))
  }

  const refreshHighlight = () => {
    data.value = { ...data.value }
  }

  onMounted(() => {
    window.addEventListener('updated-results', refreshHighlight)
  })

  onUnmounted(() => {
    window.removeEventListener('updated-results', refreshHighlight)
  })

  return {
    highlighterMenu,
    highlightColors,
    handleSelection,
    colorSelect,
    verseHighlight
  }
}

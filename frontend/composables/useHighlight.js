import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from '#imports'

import {
  highlightColorsLight,
  highlightTextColorsLight,
} from '~/data/highlightColors.js'

export function useHighlight(data) {
  const route = useRoute()

  const highlightColors = highlightColorsLight
  const highlightTextColors = highlightTextColorsLight

  const highlighterMenu = ref({
    visible: false,
    verses: [],
    x: 0,
    y: 0
  })

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

    window.removeEventListener('click', handleClickOutside)

    highlighterMenu.value = {
      visible: true,
      verses,
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY - 50
    }

    setTimeout(() => {
      window.addEventListener('click', handleClickOutside)
    }, 50)
  }

  const closeHighlighterMenu = () => {
    highlighterMenu.value.visible = false
  }

  //desktop
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

    const stored = JSON.parse(localStorage.getItem('highlights') || '[]')

    const index = stored.findIndex(
      h =>
        h.book === actualBook &&
        h.chapter === actualChapter &&
        JSON.stringify(h.verses) === JSON.stringify(verses)
    )

    if (color === 'transparent') {
      if (index !== -1) {
        stored.splice(index, 1)
        localStorage.setItem('highlights', JSON.stringify(stored))
      }
      return
    }

    if (index !== -1) {
      stored[index].bgColor = color
      stored[index].textColor = highlightTextColors[color]
      localStorage.setItem('highlights', JSON.stringify(stored))
      return
    }

    const rangeText = verses.map(v => data.value.verses[v - 1]).join('')

    const newItem = {
      id: crypto.randomUUID(),
      book: actualBook,
      chapter: actualChapter,
      verses,
      bgColor: color,
      textColor: highlightTextColors[color],
      text: rangeText,
      date: Date.now()
    }

    stored.push(newItem)
    localStorage.setItem('highlights', JSON.stringify(stored))
  }

  const colorSelect = (color) => {
    let verses = []

    // Desktop: selección de texto nativa
    if (highlighterMenu.value.verses?.length) {
      verses = highlighterMenu.value.verses
    }

    // Mobile: selección por versículo
    else if (highlighterMenu.value.selectedVerses) {
      const { start, end } = highlighterMenu.value.selectedVerses
      verses = Array.from({ length: end - start + 1 }, (_, i) => start + i)
    }

    // Guardar highlight
    saveHighlight(verses, color)

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

    return `<mark style="
      background:${match.bgColor};
      color:${match.textColor};
      padding:2px;
      border-radius:4px;
    ">${text}</mark>`
  }

  const emitHighlight = () => {
    window.dispatchEvent(new Event('updated-results'))
  }

  const refreshHighlight = () => {
    data.value = { ...data.value }
  }

  const handleClickOutside = (event) => {
    const menuEl = document.querySelector('.highlighter-menu')
    if (menuEl && !menuEl.contains(event.target)) {
      closeHighlighterMenu()
    }
  }




  //mobile
  const handleSelectionMobile = (e) => {
    const selection = window.getSelection()
    if (!selection || selection.isCollapsed) return
    
    const text = selection.toString().trim()
    if (!text) return
    
    const verses = obtainSelectedVerses()
    if (verses.length === 0) return
    
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()

    highlighterMenu.value = {
      visible: true,
      verses,
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY -50
    }

  }




  onMounted(() => {
    document.addEventListener('mouseup', handleSelection)
    document.addEventListener('touchend', handleSelectionMobile)


    setTimeout(() => {
      window.addEventListener('click', handleClickOutside)
    }, 50)

    window.addEventListener('updated-results', refreshHighlight)
  })

  onUnmounted(() => {
    document.removeEventListener('mouseup', handleSelection)
    document.removeEventListener('touchend', handleSelectionMobile)

    window.removeEventListener('click', handleClickOutside)
    window.removeEventListener('updated-results', refreshHighlight)
  })

  return {
    highlighterMenu,
    highlightColors,
    handleSelection,
    handleSelectionMobile,
    handleClickOutside,
    colorSelect,
    verseHighlight
  }
}


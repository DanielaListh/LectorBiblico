// ~/composables/useHighlight.js
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

  // Guardar highlight
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

    // Eliminar highlight
    if (color === 'transparent') {
      if (index !== -1) {
        stored.splice(index, 1)
        localStorage.setItem('highlights', JSON.stringify(stored))
      }
      return
    }

    // Actualizar highlight existente
    if (index !== -1) {
      stored[index].bgColor = color
      stored[index].textColor = highlightTextColors[color]
      localStorage.setItem('highlights', JSON.stringify(stored))
      return
    }

    // Crear highlight nuevo
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

  // Pintar versículo
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

  // Refrescar UI
  const refreshHighlight = () => {
    data.value = { ...data.value }
  }

  const applyHighlightHandler = (e) => { 
    const { verses, color } = e.detail
    saveHighlight(verses, color)
    refreshHighlight()
  }

  onMounted(() => {
    window.addEventListener('apply-highlight', applyHighlightHandler)
    window.addEventListener('updated-results', refreshHighlight)
  })

  onUnmounted(() => {
    window.removeEventListener('apply-highlight', applyHighlightHandler)
    window.removeEventListener('updated-results', refreshHighlight)
  })

  return {
    highlightColors,
    saveHighlight,
    verseHighlight
  }
}



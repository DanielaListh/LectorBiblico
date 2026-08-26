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
    const selectedSet = new Set(verses)

    const stored = JSON.parse(localStorage.getItem('highlights') || '[]')

    // 1. Limpiar versículos seleccionados de los resaltados existentes en este capítulo
    const updated = []
    for (const h of stored) {
      if (h.book === actualBook && h.chapter === actualChapter) {
        const remainingVerses = h.verses.filter(v => !selectedSet.has(v))
        if (remainingVerses.length > 0) {
          const remainingText = remainingVerses
            .map(v => (data.value?.verses ? data.value.verses[v - 1] : ''))
            .join(' ')
          updated.push({
            ...h,
            verses: remainingVerses,
            text: remainingText || h.text
          })
        }
      } else {
        updated.push(h)
      }
    }

    // 2. Si no es transparente, agregar el nuevo resaltado
    if (color !== 'transparent') {
      const sortedVerses = [...verses].sort((a, b) => a - b)
      const rangeText = sortedVerses
        .map(v => (data.value?.verses ? data.value.verses[v - 1] : ''))
        .join(' ')

      const newItem = {
        id: crypto.randomUUID(),
        book: actualBook,
        chapter: actualChapter,
        verses: sortedVerses,
        bgColor: color,
        textColor: highlightTextColors[color],
        text: rangeText,
        date: Date.now()
      }

      updated.push(newItem)
    }

    localStorage.setItem('highlights', JSON.stringify(updated))
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



import { ref } from 'vue'

export function useReaderInteractions() {
  const isSelecting = ref(false)
  const hoveredVerse = ref(null)
  const selectedVerses = ref([])
  const activeVerse = ref(null)

  const hoverVerse = (verse) => {
    hoveredVerse.value = verse
  }

  const unhoverVerse = () => {
    hoveredVerse.value = null
  }

  const activateSelectionMode = (verse) => {
    isSelecting.value = true
    activeVerse.value = verse
    selectedVerses.value = [verse]
  }

  const toggleVerseSelection = (verse) => {
    if (selectedVerses.value.includes(verse)) {
      selectedVerses.value = selectedVerses.value.filter(v => v !== verse)
    } else {
      selectedVerses.value.push(verse)
    }

    if (selectedVerses.value.length === 0) { 
      resetSelection()
    }
  }

  const resetSelection = () => { 
    isSelecting.value = false
    selectedVerses.value = []
    hoveredVerse.value = null
    activeVerse.value = null
  }

  return {
    isSelecting,
    hoveredVerse,
    selectedVerses,
    activeVerse,
    hoverVerse,
    unhoverVerse,
    activateSelectionMode,
    toggleVerseSelection,
    resetSelection
  }
}

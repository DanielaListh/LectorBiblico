import { ref, watch } from "vue"
import { useRoute } from '#imports'
import { booksMap } from "~/data/booksMap"

export function useVerseMenu(selectedVerses, resetSelection) {
  const route = useRoute()

  const menu = ref({
    visible: false,
    x: 0,
    y: 0,
    verses: []
  })

  const openMenu = (event, verseNumber) => {
    if (event?.stopPropagation) {
      event.stopPropagation()
    }

    menu.value = {
      visible: true,
      x: 0,
      y: 0,
      verses: verseNumber ? [verseNumber] : []
    }
  }

  const closeMenu = () => {
    menu.value.visible = false
  }

  if (selectedVerses) {
    watch(
      () => selectedVerses.value?.length,
      (length) => {
        if (!length && menu.value.visible) {
          closeMenu()
        }
      }
    )
  }

  const getSelectedVerses = () => {
    const list = selectedVerses?.value?.length
      ? selectedVerses.value
      : menu.value.verses
    return [...list].sort((a, b) => a - b)
  }

  const shareVerses = () => {
    const book = route.params.book
    const chapter = route.params.chapter
    const verses = getSelectedVerses()

    if (!verses.length) return

    const bookName = booksMap[book] || book
    const text = `${bookName} ${chapter}:${verses.join(', ')}`

    if (navigator.share) {
      navigator.share({ text })
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
      alert("Copiado al portapapeles")
    }

    closeMenu()
    resetSelection()
  }

  const applyHighlight = (color) => {
    const verses = getSelectedVerses()
    if (!verses.length) return

    window.dispatchEvent(new CustomEvent("apply-highlight", {
      detail: {
        verses,
        color
      }
    }))
    closeMenu()
    resetSelection()
  }

  const createNote = () => {
    const verses = getSelectedVerses()
    if (!verses.length) return

    window.dispatchEvent(new CustomEvent("create-note", {
      detail: {
        verses
      }
    }))
    closeMenu()
    resetSelection()
  }

  return {
    menu,
    openMenu,
    closeMenu,
    shareVerses,
    applyHighlight,
    createNote
  }
}

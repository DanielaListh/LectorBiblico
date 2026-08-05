import { ref } from "vue"
import { booksMap } from "~/data/booksMap"

export function useVerseMenu(selectedVerses, resetSelection) {

  const menu = ref({
    visible: false,
    x: 0,
    y: 0,
    verses: []
  })

  const openMenu = (event, verseNumber) => {
    event.stopPropagation()

    if (menu.value.visible) { 
      menu.value.verses.push()
    }

    const rect = event.target.getBoundingClientRect()

    menu.value = {
      visible: true,
      x: event.clientX - 1,
      y: event.clientY - 1,
      verses: [verseNumber]
    }
  }

  const closeMenu = () => {
    menu.value.visible = false
  }

  const shareVerses = () => {
    const book = selectedVerses.book
    const chapter = selectedVerses.chapter
    const verses = menu.value.verses

    const text = `${booksMap[book]} ${chapter}:${verses.join(', ')}`

    if (navigator.share) {
      navigator.share({ text })
    } else {
      navigator.clipboard.writeText(text)
      alert("Copiado al portapapeles")
    }

    closeMenu()
    resetSelection()
  }

  const applyHighlight = (color) => {
    window.dispatchEvent(new CustomEvent("apply-highlight", {
      detail: {
        verses: menu.value.verses,
        color
      }
    }))
    closeMenu()
    resetSelection()
  }

  const createNote = () => {
    window.dispatchEvent(new CustomEvent("create-note", {
      detail: {
        verses: menu.value.verses
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


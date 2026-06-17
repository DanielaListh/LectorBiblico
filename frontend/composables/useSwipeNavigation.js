import { ref } from "vue"

export function useSwipeNavigation(nextChapter, previousChapter, goToChapter, direction) {
  const touchStartX = ref(0)
  const touchEndX = ref(0)
  const swipeThreshold = 50 // distancia mínima para considerar un swipe

  const nextChapterSwipe = () => {
    if (nextChapter.value) {
      direction.value = 'next'
      goToChapter(nextChapter.value)
    }
  }

  const prevChapterSwipe = () => {
    if (previousChapter.value) {
      direction.value = 'prev'
      goToChapter(previousChapter.value)
    }
  }

  const handleTouchStart = (e) => {
    touchStartX.value = e.changedTouches[0].clientX// obtenemos la posición inicial del toque en el eje X  
  }

  const handleTouchEnd = (e) => {
    touchEndX.value = e.changedTouches[0].clientX // obtenemos la posicion final del toque

    const diff = touchStartX.value - touchEndX.value // nos da la diferencia entre la posición inicial y final del toque

    //detectamos seleccion de texto
    const selection = window.getSelection()
    const text = selection.toString().trim()

    if (text.length > 0) {
      handleSelection(text) //se hay texto seleccionado se llama a la funcion
      return
    }

    if (diff > swipeThreshold) return nextChapterSwipe()
    if (diff < -swipeThreshold) return prevChapterSwipe()
      
  }

  return {
    handleTouchStart,
    handleTouchEnd
  }

}





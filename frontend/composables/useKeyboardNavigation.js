import { onMounted, onUnmounted } from "vue"

export function useKeyboardNavigation(nextChapter, previousChapter, goToChapter, direction) {
  const handleKey = (e) => {
    
    if (e.key === 'ArrowRight' && nextChapter.value) {
      direction.value = 'next'
      goToChapter(nextChapter.value)
    }
    if (e.key === 'ArrowLeft' && previousChapter.value) {
      direction.value = 'prev'
      goToChapter(previousChapter.value)
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKey)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKey)
  })

  return {handleKey}
}


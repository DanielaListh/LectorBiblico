import { watch, nextTick } from "vue"
import { useRoute } from "#imports"

export function useScroll(data) {
  
  const route = useRoute()
  
  const scrollToVerse = (vers) => {
    setTimeout(() => {
      const el = document.querySelector(`[data-vers="${vers}"]`)
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block:"center"
        })
      }
    }, 1800)
  }

  // if the vers change, wait to make a scroll 
  watch(
    () => data.value,
    async () => {
      const vers = route.query.vers
      if (vers) {
        await nextTick() // wait for the DOM to update before scrolling
        scrollToVerse(vers)
      }
    }
  )

  return{ scrollToVerse }
}







export function useScroll() {
  const scrollToVerse = (vers) => {
    setTimeout(() => {
      const el = document.querySelector(`[data-vers="${vers}"]`)
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block:"center"
        })
      }
    }, 300)
  }

  // if the vers change, wait to make a scroll 
  watch(
    () => data.value,
    () => {
      const vers = route.query.vers
      if (vers) {
        scrollToVerse(vers)
      }
    }
  )

  return{ scrollToVerse }
}






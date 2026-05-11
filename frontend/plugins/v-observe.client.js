export default defineNuxtPlugin(() => {
  return {
    provide: {
      observe: (el, callback) => { // el es elemto a observar
        const observer = new IntersectionObserver(
          ([entry]) => callback(entry.isIntersecting),
          { threshold: 0.1 } // El callback se ejecutará cuando el elemento esté al menos un 10% visible
        )
        observer.observe(el) 
      }
    }
  }
})

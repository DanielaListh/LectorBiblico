<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted,watch } from 'vue'
import { booksMap } from '~/data/booksMap'
import { computed } from 'vue'
import { chapterPerBooks } from '~/data/chapters'



const route = useRoute() 
const router = useRouter()

const book = computed(() => route.params.book)
const chapter = computed(() => Number(route.params.chapter))
const totalChapters = computed(() => chapterPerBooks[book.value])
const previousChapter = computed(() => { return chapter.value > 1 ? chapter.value - 1 : null }) // Return the previous chapter number if the current chapter is greater than 1; otherwise return null
const nextChapter = computed(() => { return chapter.value < totalChapters.value ? chapter.value + 1 : null }) // return the next chapter number if the current chapter is lower than totalChapters; otherwise return null
const loading = ref(true)
const direction = ref('next') // animation to change the pag


const data = ref({
  verses: []
}) // The data for the loaded chapter will be stored here

const loadChapter = async () => {
  loading.value = true

  try {
    const res = await fetch(`https://api.midvash.com/v1/rvr1960/${book.value}/${chapter.value}`)
    const json = await res.json()
    data.value = json.data 
    console.log(data.value)

  } catch (e){
    console.error("Error al cargar el capitulo: ", error)
  }
  loading.value = false
}

watch(
  () => data.value,
  () => {
    const vers = route.query.vers
    if (vers) {
      scrollToVerse(vers)
    }
  }
)

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

onMounted(loadChapter)

watch(
  () => route.fullPath,
  () => { loadChapter() }
)

const goToChapter = async (num) => {
  await router.push(`/panel/libros/${route.params.book}/${num}`)

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })

}

//swipe

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

  if (diff > swipeThreshold) {
    nextChapterSwipe()
    return
  } 

  if (diff < -swipeThreshold) {
    prevChapterSwipe()
    return
  }

}

const handleKey = (e) => {
  console.log(e.key)
   if (e.key === 'ArrowRight') {
     nextChapterSwipe()
   }
   if (e.key === 'ArrowLeft') {
    prevChapterSwipe()
   }
}

onMounted(() => {
  window.addEventListener('keydown', handleKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKey)
})


//selected text for mouse
//const handleMouseUp = () => {
  //if (text.length > 0) {
    //handleSelection(text)
  //}
//}

//funcion para manejar la seleccion de texto
const handleSelection = () => {
  const selection = window.getSelection()
  const text = selection.toString().trim()

  if (!text) return

  const verses = obtainSelectedVerses()
  if(verses.length === 0) return
  openHighlighterMenu(verses)
}

//menu flotante
const highlighterMenu = ref({
  visible: false,
  verses: [],
  x: 0,
  y:0
}) 



const highlightColors = [
  "transparent",
  "#d8c3a6",  // beige
  "#dcc16b",  // yellow
  "#ca7f56", // orange
  "#994d2c",  // terracota
  "#9baa5e", // green
  "#54523a", // dark green
  "#734f3a" // brown
]

//open the floating menu
const openHighlighterMenu = (verses) => {
  const selection = window.getSelection()
  if (!selection.rangeCount) return 

  const rect = selection.getRangeAt(0).getBoundingClientRect()

  highlighterMenu.value = {
    visible: true,
    verses,
    x: rect.left + window.scrollX,
    y:rect.top + window.scrollY - 50 // a little higher up
  }
}

//close menu
const closeHighlighterMenu = () => {
  highlighterMenu.value.visible = false
}


const colorSelect = (color) => {
  saveHighligh(highlighterMenu.value.verses, color)
  emitHighlight()
  closeHighlighterMenu()
}

// the selected texts are saved to localStorage 
const saveHighligh = (verses, color) => {
  const actualBook = route.params.book
  const actualChapter = Number(route.params.chapter)

  const rangeText = verses.map(v => data.value.verses[v - 1]).join("")

  const nuevo = {
    id: crypto.randomUUID(),
    book: actualBook,
    chapter: actualChapter,
    verses,
    color,
    text: rangeText,
    date:Date.now()
  }

  const storaged = JSON.parse(localStorage.getItem("highlights") || "[]") /////////////////

  if (color === "transparent") {
    const filtered = storaged.filter(
      h => !(h.book === actualBook &&
        h.chapter === actualChapter &&
        JSON.stringify(h.verses) === JSON.stringify(verses))
  )
    localStorage.setItem("highlights", JSON.stringify(filtered))
    return
  }

  //save the new highlight
  storaged.push(nuevo)
  localStorage.setItem("highlights", JSON.stringify(storaged))
}

const verseHighlight = (numVers, text) => {
  const highlights = JSON.parse(localStorage.getItem("highlights") || "[]")

  const actualBook = route.params.book
  const actualChapter = Number(route.params.chapter)

  const delChapter = highlights.filter(
    h => h.book === actualBook && h.chapter === actualChapter
  )

  const match = delChapter.find(highlights => highlights.verses.includes(numVers))
  
  if (!match) return text

  return `<mark style="background:${match.color}; padding:2px; border-radius:4px;">${text}</mark>` 
}

const obtainSelectedVerses = () => {
  const selection = window.getSelection()
  if (!selection.rangeCount) return [] 

  const range = selection.getRangeAt(0)
  const verses = [...document.querySelectorAll(".verse")]

  //detecta que versiculos intersectan la seleccion
  const selecteds = verses.filter(v => {
    const rect = v.getBoundingClientRect()
    const selRect = range.getBoundingClientRect()

    return !(
      rect.bottom < selRect.top ||
      rect.top > selRect.bottom
    )
  })

  return selecteds.map(v => Number(v.dataset.vers))
}

// when a highlight is created, an event is dispatched
const emitHighlight = () => {
  window.dispatchEvent(new Event("updated-results"))
}

onMounted(() => {
  window.addEventListener("updated-results", refreshHighlight)
})

onUnmounted(() => {
  window.removeEventListener("updated-results", refreshHighlight)
})

const refreshHighlight = () => {
  data.value = { ...data.value} //fuerza el re renderizado
}

</script>

<template>
  <section 
    class="w-auto h-auto overflow-x-hidden md:h-screen md:overflow-y-auto md:w-full" 
    @touchstart="handleTouchStart" 
    @touchend="handleTouchEnd"
    @mouseup="handleSelection"
    
  >
  <!--Menu flotante-->
  <transition name="fade-scale">
    <div 
      v-if="highlighterMenu.visible"
      class="fixed z-[600] bg-bg2 border border-border2 shadow-xl rounded-xl p-3 flex gap-2 items-center"
      :style="{top: highlighterMenu.y + 'px', left: highlighterMenu.x + 'px'}" 
    >
      <button
        v-for="color in highlightColors"
        :key="color"
        @click="colorSelect(color)"
        class="w-7 h-7 rounded-full"
        :style="{ background: color === 'transparent' ? 'white' : color }"
      >
        <span v-if="color === 'transparent'" class="text-text1 text-xs font-bold"></span>
      </button>
    </div>
  </transition>
  
     <!-- content of book name, chapter and buttons to navigate between chapters -->
    <div class="items-center px-5 py-4 sticky top-0 
          flex md:justify-between md:px-10 md:py-6 md:bg-main ">
      <div>
        <h1
          class="text-3xl font-bold font-lexendExa text-text1 md:text-5xl"
        >
          {{ booksMap[book]}}
        </h1>

        <h2
          v-if="data?.chapter"
          class="font-lexendExa  text-1xl font-semibold text-text1 md:mt-4 md:text-2xl"
        >
          Capítulo {{ data.chapter }}
        </h2>
      </div>
          
      <!-- permitir navegacion mobile con el tactil -->
      <div class=" hidden md:flex md:justify-end md:gap-5 ">
        <button 
          v-if="previousChapter"
          @click="
            direction = 'prev';
            goToChapter(previousChapter)">
          <img src="/img/flechaIzq.png" alt="Anterior"class="w-[30px]">
        </button>
        <button
          v-if="nextChapter" 
          @click="
            direction = 'next';
            goToChapter(nextChapter)">
          <img src="/img/flechaDer.png" alt="Siguiente" class="w-[30px]">
        </button>
      </div>
    </div>

    <!-- loader -->
    <div v-if="loading" class="px-10 animate-pulse">
      <div class="h-6 w-1/6 bg-bg3 rounded mb-12"></div>
      <div class="h-6 w-4/6 bg-bg4 rounded mb-4"></div>
      <div class="h-6 w-3/6 bg-bg4 rounded mb-4"></div>
      <div class="h-6 w-5/6 bg-bg4 rounded mb-4"></div>
      <div class="h-6 w-3/6 bg-bg4 rounded mb-4"></div>
      <div class="h-6 w-4/6 bg-bg4 rounded mb-4"></div>
      <div class="h-6 w-3/6 bg-bg4 rounded mb-4"></div>
      <div class="h-6 w-5/6 bg-bg4 rounded mb-4"></div>
      <div class="h-6 w-3/6 bg-bg4 rounded mb-4"></div>
      <div class="h-6 w-3/6 bg-bg4 rounded mb-4"></div>
      <div class="h-6 w-4/6 bg-bg4 rounded mb-4"></div>
      <div class="h-6 w-3/6 bg-bg4 rounded mb-4"></div>
      <div class="h-6 w-5/6 bg-bg4 rounded mb-4"></div>
      <div class="h-6 w-3/6 bg-bg4 rounded mb-4"></div>
      <div class="h-6 w-5/6 bg-bg4 rounded mb-4"></div>
      <div class="h-6 w-3/6 bg-bg4 rounded mb-4"></div>
    </div>
        
    <!-- contenedor de versiculos -->
    <Transition
      :name="direction === 'next' ? 'slide-next' : 'slide-prev'"
      mode="out-in"
    >
      <div
        v-if="!loading"
        :key="`${book}-${chapter}`"
        class="pl-5 flex flex-col gap-2 leading-relaxed text-lg md:max-w-4xl md:px-10 md:pt-3 md:pb-12"
      >
        <div
          v-for="(vers, index) in data?.verses || []"
          :key="index"
          class="verse flex gap-3"
          :data-vers="index + 1"
        >
          <span class="font-bold font-lexendExa text-text2">
            {{ index + 1 }}
          </span>

          <p 
            class="text-text1 font-lexendExa"
            v-html="verseHighlight(index + 1, vers)"
            >
            
          </p>
        </div>
      </div>
    </Transition>

  </section>
</template>

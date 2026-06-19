<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Books from '~/components/Books'
import Results from '~/components/Results'
import { useTheme } from '~/composables/useTheme'
import { booksMap } from '~/data/booksMap'

defineProps({
  showChapter: Boolean
})

const emit = defineEmits(['toggle-chapter'])

const route = useRoute()
const router = useRouter()

const search = ref('')
const activeIndex = ref(-1)

const normalize = (t) =>
  t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

const books = Object.keys(booksMap)

const filteredBooks = computed(() => {
  if (!search.value) return books
  return books.filter(book =>
    normalize(booksMap[book] || book).includes(normalize(search.value))
  )
})

const isReadRoute = computed(() => route.path === '/panel/libros')

const goToBook = (book) => {
  search.value = ''
  activeIndex.value = -1
  router.push(`/panel/libros/${book}/1`)
}

const resultsVisible = computed(() =>
  !isReadRoute.value && search.value.trim().length > 0
)

const handleKey = (e) => {
  if (!resultsVisible.value) return

  const total = filteredBooks.value.length

  switch (e.key) {
    case 'Escape':
      search.value = ''
      activeIndex.value = -1
      break

    case 'ArrowDown':
      e.preventDefault()
      activeIndex.value = (activeIndex.value + 1) % total
      break

    case 'ArrowUp':
      e.preventDefault()
      activeIndex.value = (activeIndex.value - 1 + total) % total
      break

    case 'Enter':
      if (activeIndex.value >= 0) {
        goToBook(filteredBooks.value[activeIndex.value])
      }
      break
  }
}

const clickOutsideSearch = (e) => {
  if (!e.target.closest('.search-container')) {
    search.value = ''
    activeIndex.value = -1
  }
}

const open = ref(null)

const toggle = (name) => {
  open.value = open.value === name ? null : name
}

const close = () => {
  open.value = null
}

const clickOutsideMenu = (e) => {
  if (!e.target.closest('.menu-opciones')) close()
}

onMounted(() => {
  window.addEventListener('keydown', handleKey)
  window.addEventListener('click', clickOutsideSearch)
  window.addEventListener('click', clickOutsideMenu)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKey)
  window.removeEventListener('click', clickOutsideSearch)
  window.removeEventListener('click', clickOutsideMenu)
})

const { toggleTheme } = useTheme()
</script>


<template>
  <section class="flex px-[10px] py-[15px] gap-3 text-text1 justify-between
    md:px-[30px] md:h-[80px] md:py-[20px]  md:gap-4">

    

    <div class="my-auto">
      <button class="block md:hidden"
        @click="emit('toggle-chapter')"
      >
        <svg 
        class="w-8 h-8" 
        style="color: var(--icon-color)" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg">
          <path 
          transform="scale(1.3)" 
          d="M4 6H20M4 12H14M4 18H9" 
          stroke="currentColor" 
          stroke-width="3" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div>
      <button
        @click="router.push('/panel')"
        class="font-lexendExa text-center text-xl text-text1 hover:text-hoverText1 transition duration-300"
      >
      Inicio
      </button>
    </div>

    <div class="hidden md:relative md:flex md:gap-2 md:mx-auto md:items-center search-container ">
      <input
        type="text"
        v-model="search"
        class="w-[150px] md:w-[300px] md:h-[30px] text-center bg-transparent border-2 rounded-lg border-border1 focus:outline-none placeholder-placeholder"
        placeholder="Buscar libro"
      >
      <Results
        v-if="resultsVisible"
        :results="filteredBooks"
        :search="search"
        :activeIndex="activeIndex"
        @select="goToBook"
      />

    </div>

    <button @click="toggleTheme" class="hidden md:block">
      <img class="theme-icon w-8 " alt="tema" />
    </button>

    
    <div class="relative menu-opciones">
      <button
        @click.stop="toggle('opciones')" 
        class="ml-4 text-text hover:text-hoverText1 transition duration-300">
        <svg 
          class="w-8 h-8" 
          style="color:var(--icon-color)"
          fill="currentColor" 
          xmlns="http://www.w3.org/2000/svg">
          <path 
          d="M4 6H20M4 12H20M4 18H20"
          transform="scale(1.3)" 
          stroke="currentColor" 
          stroke-width="3" 
          stroke-linecap="round" 
          stroke-linejoin="round"/>
        </svg>
      </button>

      <transition name="fade">
        <div
          v-show="open === 'opciones'" 
          class="w-[150px] font-lexendExa absolute right-0 mt-2 bg-bg2 border border-border2 rounded-lg 
          p-3 flex flex-col gap-2 z-[9999] transition-all duration-300"   
        >
          <a href="/panel/favorites" class="hover:text-hoverText1">Favoritos</a>
          <a href="/panel/notes" class="hover:text-hoverText1">Notas</a>
          <a href="/" class="hover:text-hoverText1">Pagina principal</a>
        </div>
      </transition>
    </div>
  

    
  </section>

  <!-- /leer → mostrar Libros -->
  <Books
    v-if="isReadRoute"
    :books="filteredBooks"
    @select="goToBook"
  /> 
   
</template>

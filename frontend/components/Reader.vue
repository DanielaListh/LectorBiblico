<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

let longPressTimer = null
let touchStartCoords = { x: 0, y: 0 }
let isLongPressActive = false

const handleVerseTouchStart = (e, verseNumber) => {
  if (isSelecting.value) return

  const touch = e.touches[0]
  touchStartCoords = { x: touch.clientX, y: touch.clientY }
  isLongPressActive = false

  longPressTimer = setTimeout(() => {
    isLongPressActive = true
    if (navigator.vibrate) {
      try {
        navigator.vibrate(40)
      } catch (err) {}
    }
    activateSelectionMode(verseNumber)
    openMenu(null, verseNumber)
  }, 450)
}

const handleVerseTouchMove = (e) => {
  if (!longPressTimer) return
  const touch = e.touches[0]
  const diffX = Math.abs(touch.clientX - touchStartCoords.x)
  const diffY = Math.abs(touch.clientY - touchStartCoords.y)

  if (diffX > 10 || diffY > 10) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
}

const handleVerseTouchEnd = () => {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
}

const handleVerseClick = (verseNumber) => {
  if (isLongPressActive) {
    isLongPressActive = false
    return
  }
  if (isSelecting.value) {
    toggleVerseSelection(verseNumber)
  }
}

const handleToggleSelectionMode = () => {
  if (!isSelecting.value) {
    isSelecting.value = true
    openMenu(null, null)
  } else {
    closeMenu()
    resetSelection()
  }
}

onMounted(() => {
  window.addEventListener('toggle-selection-mode', handleToggleSelectionMode)
})

onUnmounted(() => {
  window.removeEventListener('toggle-selection-mode', handleToggleSelectionMode)
  if (longPressTimer) {
    clearTimeout(longPressTimer)
  }
})
import { useChapterNavigation } from '~/composables/useChapterNavigation'
import { useReaderInteractions } from '~/composables/useReaderInteractions'
import { useVerseMenu } from '~/composables/useVerseMenu'
import { useHighlight } from '~/composables/useHighlight'
import { useKeyboardNavigation } from '~/composables/useKeyboardNavigation'
import { useSwipeNavigation } from '~/composables/useSwipeNavigation'
import { useScroll } from '~/composables/useScroll'
import { booksMap } from '~/data/booksMap'

// Interacciones
const { 
  isSelecting,
  hoveredVerse,
  selectedVerses,
  activeVerse,
  hoverVerse,
  unhoverVerse,
  activateSelectionMode,
  toggleVerseSelection,
  resetSelection
} = useReaderInteractions()

// Menú inferior
const {
  menu, 
  openMenu,
  closeMenu,
  shareVerses,
  applyHighlight,
  createNote
} = useVerseMenu(selectedVerses, resetSelection)

// Navegación capítulo
const {
  book,
  chapter,
  data,
  loading,
  direction,
  previousChapter,
  nextChapter,
  goToChapter
} = useChapterNavigation()

// Swipe
const { handleTouchStart, handleTouchEnd } = useSwipeNavigation(
  nextChapter,
  previousChapter,
  goToChapter,
  direction
)

// Keyboard
useKeyboardNavigation(nextChapter, previousChapter, goToChapter, direction)

const highlight = useHighlight(data)
const verseHighlight = highlight.verseHighlight
const highlightColors = highlight.highlightColors

// Scroll
const { scrollToVerse } = useScroll(data)

// Reset selection on chapter change
watch([book, chapter], () => {
  closeMenu()
  resetSelection()
})

const selectedVersesLabel = computed(() => {
  const currentBookName = (book.value && booksMap[book.value]) || book.value || ''
  const currentChapter = chapter.value || data.value?.chapter || ''
  const verses = selectedVerses.value?.length
    ? [...selectedVerses.value].sort((a, b) => a - b)
    : menu.value.verses || []

  if (!verses.length) return `${currentBookName} ${currentChapter}`

  if (verses.length === 1) {
    return `${currentBookName} ${currentChapter}:${verses[0]}`
  }

  const isConsecutive = verses.every((v, i) => i === 0 || v === verses[i - 1] + 1)
  if (isConsecutive) {
    return `${currentBookName} ${currentChapter}:${verses[0]}-${verses[verses.length - 1]}`
  }

  return `${currentBookName} ${currentChapter}:${verses.join(', ')}`
})
</script>


<template>
  <section 
    class="highlightMenu-scroll w-auto h-auto overflow-x-hidden md:h-screen md:overflow-y-auto md:w-full md:pr-20" 
  >
  
    <!-- content of book name, chapter and buttons to navigate between chapters -->
    <div class="items-center px-5 py-5 md:h-[120px] md:w-[70%] md:fixed md:top-[82px] 
      flex md:justify-between bg-bg1 md:px-10 z-[30]">
      <div v-if="book && booksMap[book]" class="pl-9">
        <h1
          class="font-cinzel text-4xl text-text2 md:text-5xl"
        >
          {{ booksMap[book]}}
        </h1>

        <h3
          class="text-text3 font-lexendExa text-2xl md:text-3xl h-[36px]"
        >
          {{ loading ? '' : `Capítulo ${data?.chapter}` }}
        </h3>
      </div>
          
      <!-- permitir navegacion mobile con el tactil -->
      <div class=" hidden md:flex md:justify-end md:gap-5 ">
        <button 
          v-if="previousChapter"
          @click="
            direction = 'prev';
            goToChapter(previousChapter)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon-line"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12l14 0" />
              <path d="M5 12l6 6" />
              <path d="M5 12l6 -6" />
            </svg>

        </button>
        <button
          v-if="nextChapter" 
          @click="
            direction = 'next';
            goToChapter(nextChapter)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon-line"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12l14 0" />
            <path d="M13 18l6 -6" />
            <path d="M13 6l6 6" />
          </svg>
        </button>
      </div>
    </div>
    
    <div class="md:w-full md:h-[120px]"></div>

    <!-- loader -->
    <div
      v-if="loading"
      class="-mt-[45px] px-5 md:px-10 animate-pulse">
      <div class="pl-9 mb-12">
        <div class="h-8 w-1/4 bg-bg3 rounded"></div>
      </div>
      <div class="pl-9 flex flex-col gap-4">
        <div class="h-6 w-4/6 bg-bg4 rounded"></div>
        <div class="h-6 w-3/6 bg-bg4 rounded"></div>
        <div class="h-6 w-5/6 bg-bg4 rounded"></div>
        <div class="h-6 w-3/6 bg-bg4 rounded"></div>
        <div class="h-6 w-4/6 bg-bg4 rounded"></div>
        <div class="h-6 w-3/6 bg-bg4 rounded"></div>
        <div class="h-6 w-5/6 bg-bg4 rounded"></div>
        <div class="h-6 w-3/6 bg-bg4 rounded"></div>
        <div class="h-6 w-3/6 bg-bg4 rounded"></div>
        <div class="h-6 w-4/6 bg-bg4 rounded"></div>
        <div class="h-6 w-3/6 bg-bg4 rounded"></div>
        <div class="h-6 w-5/6 bg-bg4 rounded"></div>
        <div class="h-6 w-3/6 bg-bg4 rounded"></div>
        <div class="h-6 w-5/6 bg-bg4 rounded"></div>
        <div class="h-6 w-3/6 bg-bg4 rounded"></div>
      </div>
    </div>
        
    <!-- contenedor de versiculos -->
    <Transition
      :name="direction === 'next' ? 'slide-next' : 'slide-prev'"
      mode="out-in"
    >
      <div
        v-if="!loading"
        :key="`${book}-${chapter}`"
        class="flex flex-col gap-2 leading-relaxed text-lg md:max-w-4xl md:px-10 md:pt-3 md:pb-28 px-5 pb-28"
      >
        <div
          v-for="(vers, index) in data?.verses || []"
          :key="index"
          class="verse group relative flex gap-3 select-none md:select-auto"
          :class="{ 'cursor-pointer': isSelecting }"
          :data-vers="index + 1"
          @mouseenter="hoverVerse(index + 1)"
          @mouseleave="unhoverVerse"
          @touchstart="handleVerseTouchStart($event, index + 1)"
          @touchmove="handleVerseTouchMove"
          @touchend="handleVerseTouchEnd"
          @touchcancel="handleVerseTouchEnd"
          @click="handleVerseClick(index + 1)"
        >

          <!-- Checkbox visible en hover o en modo selección (instantáneo, sin animaciones) -->
          <div
            class="w-6 h-6 border border-bg4 rounded flex items-center justify-center cursor-pointer shrink-0 mt-1"
            :class="[
              isSelecting
                ? 'opacity-100 pointer-events-auto'
                : (hoveredVerse === index + 1 ? 'opacity-100 pointer-events-auto hover:border-text2' : 'opacity-0 pointer-events-none')
            ]"
            @click.stop="
              if (!isSelecting) {
                activateSelectionMode(index + 1);
                openMenu($event, index + 1);
              } else {
                toggleVerseSelection(index + 1);
              }
            "
          >
            <svg
              class="w-5 h-5 text-text2"
              :class="isSelecting && selectedVerses.includes(index + 1) ? 'opacity-100' : 'opacity-0'"
              fill="var(--icon-color)"
              stroke-width="3"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <span class="font-bold font-lexendExa text-text2 shrink-0">
            {{ index + 1 }}
          </span>

          <p
            class="text-text1 text-[18px] md:text-[20px] font-lexendExa leading-[1.7] max-w-[65ch]"
            v-html="verseHighlight(index + 1, vers)"
          ></p>

          <div 
            v-if="isSelecting && selectedVerses.includes(index + 1)"
            class="absolute inset-0 bg-[#ef8f5b]/15 pointer-events-none rounded"
          ></div>

        </div>

      </div>
    </Transition>

    <!-- Menú inferior en el contenedor del lector (no cubre el panel lateral) -->
    <Transition name="slide-up">
      <div
        v-if="menu.visible"
        class="fixed bottom-0 right-0 w-full md:w-[80%] z-50 bg-bg2 border-t md:border-l border-border1 shadow-2xl py-3 px-4 md:px-8"
        @click.stop
      >
        <div class="max-w-4xl mx-auto flex items-center justify-between gap-3 md:gap-6">
          
          <!-- Botón cerrar y Versículos seleccionados -->
          <div class="flex items-center gap-2 md:gap-3 shrink-0">
            <button
              @click="closeMenu(); resetSelection()"
              class="p-1.5 rounded-lg hover:bg-bg4 text-text2 transition duration-200 focus:outline-none"
              title="Cerrar selección"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <span class="font-lexendExa font-semibold text-text1 text-sm md:text-base select-none">
              {{ selectedVersesLabel }}
            </span>
          </div>

          <!-- Colores para resaltar -->
          <div class="flex items-center gap-1.5 md:gap-2.5 overflow-x-auto py-1 px-1">
            <button
              v-for="color in highlightColors"
              :key="color"
              class="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-border1 transition-transform hover:scale-110 active:scale-95 flex items-center justify-center shrink-0 shadow-sm"
              :style="{ background: color === 'transparent' ? 'transparent' : color }"
              :title="color === 'transparent' ? 'Quitar resaltado' : 'Resaltar'"
              @click="applyHighlight(color)"
            >
              <svg
                v-if="color === 'transparent'"
                class="w-4 h-4 text-text3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </button>
          </div>

          <!-- Acciones: Compartir y Nota -->
          <div class="flex items-center gap-2 shrink-0">
            <!-- Compartir -->
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg4 hover:bg-hoverBg text-text2 font-lexendExa text-sm transition duration-200"
              @click="shareVerses"
              title="Compartir"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              <span class="hidden sm:inline">Compartir</span>
            </button>

            <!-- Nota -->
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg4 hover:bg-hoverBg text-text2 font-lexendExa text-sm transition duration-200"
              @click="createNote"
              title="Crear nota"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                <path d="M9 7l6 0" />
                <path d="M9 11l6 0" />
                <path d="M9 15l4 0" />
              </svg>
              <span class="hidden sm:inline">Nota</span>
            </button>
          </div>

        </div>
      </div>
    </Transition>

  </section>
</template>

<script setup>
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

// Menú lateral
const {
  menu, 
  isMenuOpen,
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

const showColorMenu = ref(false)


// Highlight (solo pintar)
// const { verseHighlight, highlightColors } = useHighlight(data)

// Scroll
const { scrollToVerse } = useScroll(data)


</script>


<template>
  <section 
    class="highlightMenu-scroll w-auto h-auto overflow-x-hidden md:h-screen md:overflow-y-auto md:w-full md:pr-20" 
  >
  
    <!-- content of book name, chapter and buttons to navigate between chapters -->
    <div class="items-center p-5 md:h-[120px] md:w-[70%] md:fixed md:top-[82px] 
      flex md:justify-between bg-bg1 md:px-0 md:pl-5 z-[30]">
      <div v-if="book && booksMap[book]">
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
      class="-mt-[45px] px-5 animate-pulse">
      <div class="h-8 w-1/4 bg-bg3 rounded mb-12"></div>
      <div class="ml-[40px] h-6 w-4/6 bg-bg4 rounded mb-4"></div>
      <div class="ml-[40px] h-6 w-3/6 bg-bg4 rounded mb-4"></div>
      <div class="ml-[40px] h-6 w-5/6 bg-bg4 rounded mb-4"></div>
      <div class="ml-[40px] h-6 w-3/6 bg-bg4 rounded mb-4"></div>
      <div class="ml-[40px] h-6 w-4/6 bg-bg4 rounded mb-4"></div>
      <div class="ml-[40px] h-6 w-3/6 bg-bg4 rounded mb-4"></div>
      <div class="ml-[40px] h-6 w-5/6 bg-bg4 rounded mb-4"></div>
      <div class="ml-[40px] h-6 w-3/6 bg-bg4 rounded mb-4"></div>
      <div class="ml-[40px] h-6 w-3/6 bg-bg4 rounded mb-4"></div>
      <div class="ml-[40px] h-6 w-4/6 bg-bg4 rounded mb-4"></div>
      <div class="ml-[40px] h-6 w-3/6 bg-bg4 rounded mb-4"></div>
      <div class="ml-[40px] h-6 w-5/6 bg-bg4 rounded mb-4"></div>
      <div class="ml-[40px] h-6 w-3/6 bg-bg4 rounded mb-4"></div>
      <div class="ml-[40px] h-6 w-5/6 bg-bg4 rounded mb-4"></div>
      <div class="ml-[40px] h-6 w-3/6 bg-bg4 rounded mb-4"></div>
    </div>
        
    <!-- contenedor de versiculos -->
    <Transition
      :name="direction === 'next' ? 'slide-next' : 'slide-prev'"
      mode="out-in"
    >
      <div
        v-if="!loading"
        :key="`${book}-${chapter}`"
        class="flex flex-col gap-2 leading-relaxed text-lg md:max-w-4xl md:px-10 md:pt-3 md:pb-12 px-5 pb-4"
      >
        <div
          v-for="(vers, index) in data?.verses || []"
          :key="index"
          class="verse relative flex gap-3"
          :data-vers="index + 1"
          @mouseenter="hoverVerse(index + 1)"
          @mouseleave="unhoverVerse"
        >

          <div
            v-if="isSelecting"
            class="w-6 h-6 border border-bg4 rounded flex items-center justify-center"
            @click="toggleVerseSelection(index + 1)"
          >
            <svg
              class="w-5 h-5 text-text2"
              :class="selectedVerses.includes(index + 1) ? 'opacity-100' : 'opacity-0'"
              fill="var(--icon-color)"
              stroke-width="3"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>


          <span class="font-bold font-lexendExa text-text2">
            {{ index + 1 }}
          </span>

          <p
            class="text-text1 text-[18px] md:text-[20px] font-lexendExa leading-[1.7] max-w-[65ch]"
            v-html="verseHighlight(index + 1, vers)"
          ></p>

          <button 
            v-if="hoveredVerse === index + 1 && !isSelecting"
            @click="
              activateSelectionMode(index + 1);
              openMenu($event, index + 1)
            "
            class="absolute right-0 top-0 p-1 opacity-80 hover:opacity-100 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon-line"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 9l6 6l6 -6" />
            </svg>
          </button>

          <div 
            v-if="isSelecting && selectedVerses.includes(index + 1)"
            class="absolute inset-0 bg-[#ef8f5b]/15 pointer-events-none rounded"
          ></div>

        </div>


        <div v-if="menu.visible" class="fixed inset-0 z-[49]" @click="closeMenu"></div>

        <div
          v-if="menu.visible"
          class="fixed flex flex-col items-center justify-center gap-2 z-[50] bg-bg4 rounded-xl 
          w-auto h-auto"
          :style="{ top: menu.y + 'px', left: menu.x + 'px' }" 
          @click.stop
        >
          <div>
            <button
              class="flex items-center p-1 mx-auto"
              @click="shareVerses"
            >
              <svg class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path :style="{ fill: 'var(--icon-color)'}" d="M9 12C9 13.3807 7.88071 14.5 6.5 14.5C5.11929 14.5 4 13.3807 4 12C4 10.6193 5.11929 9.5 6.5 9.5C7.88071 9.5 9 10.6193 9 12Z" />
                <path :style="{ stroke: 'var(--icon-color)'}" d="M14 6.5L9 10" />
                <path :style="{ stroke: 'var(--icon-color)'}" d="M14 17.5L9 14" />
                <path :style="{ fill: 'var(--icon-color)'}" d="M19 18.5C19 19.8807 17.8807 21 16.5 21C15.1193 21 14 19.8807 14 18.5C14 17.1193 15.1193 16 16.5 16C17.8807 16 19 17.1193 19 18.5Z" />
                <path :style="{ fill: 'var(--icon-color)'}" d="M19 5.5C19 6.88071 17.8807 8 16.5 8C15.1193 8 14 6.88071 14 5.5C14 4.11929 15.1193 3 16.5 3C17.8807 3 19 4.11929 19 5.5Z" />
              </svg>
            </button>
          </div> 
          <!-- Cambiar color -->
          <div>
            <button
              @click="showColorMenu = !showColorMenu"
              class="p-1 mx-auto"
            >
              <svg class="w-6 h-6" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path 
                  :style="{ fill: 'var(--icon-color)'}" 
                  d="M8.25 0c-6.38 0-9.11 7.38-8.010 9.92 0.82 1.89 2.62 0.080 3.34 1 1.88 2.46-2.11 
                  3.81 0.090 4.68 2.59 1.060 12.33 0.4 12.33-8.53 0-2.69-1.34-7.070-7.75-7.070zM4.47 
                  9c-0.815-0.017-1.47-0.682-1.47-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5c0 
                  0 0 0 0 0 0 0.828-0.672 1.5-1.5 1.5-0.011 0-0.021-0-0.032-0zM6 3.5c0-0.828 
                  0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5-0.672 1.5-1.5 1.5c-0.011 0-0.021-0-0.032-0-0.814-0.017-1.468-0.682-1.468-1.5 0-0 0-0 0-0zM8.47 
                  14c-0.815-0.017-1.47-0.682-1.47-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5c0 0 0 0 0 0 0 
                  0.828-0.672 1.5-1.5 1.5-0.011 0-0.021-0-0.032-0zM12.47 11c-0.815-0.017-1.47-0.682-1.47-1.5 0-0.828 
                  0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5c0 0 0 0 0 0 0 0.828-0.672 1.5-1.5 1.5-0.011 0-0.021-0-0.032-0zM12.47 
                  6c-0.815-0.017-1.47-0.682-1.47-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5c0 0 0 0 0 0 0 
                  0.828-0.672 1.5-1.5 1.5-0.011 0-0.021-0-0.032-0z"
                ></path>
              </svg>
            </button>

            <Transition name="fade">
              <div
                v-if="showColorMenu"
                class="absolute block gap-2 bg-bg4 rounded-full p-2"
              >
                <button
                  v-for="color in highlightColors"
                  :key="color"
                  class="w-6 h-6 rounded-full"
                  :style="{ background: color }"
                  @click="applyHighlight(color)"
                ></button>
              </div>
            </Transition>
          </div>

          <div>
            <button @click="createNote" class="p-1 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon-line"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                <path d="M9 7l6 0" />
                <path d="M9 11l6 0" />
                <path d="M9 15l4 0" />
              </svg>
            </button>
          </div>
          
        </div>
      </div>
    </Transition>

  </section>
</template>

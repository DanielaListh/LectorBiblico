<script setup>
import { useChapterNavigation } from '~/composables/useChapterNavigation';
import { useHighlight } from '~/composables/useHighlight';
import { useKeyboardNavigation } from '~/composables/useKeyboardNavigation';
import { useScroll } from '~/composables/useScroll';
import { useSwipeNavigation } from '~/composables/useSwipeNavigation';
import { booksMap } from '~/data/booksMap'
import { ref, onMounted, onUnmounted } from 'vue'


const touchStartVerse = ref(null)
const touchEndVerse = ref(null)

const isMobile = ref(false)

let scrollContainer = null

const closeMenuOnScroll = () => {
  highlighterMenu.value.visible = false
  closeMenu()
}

onMounted(() => {
  isMobile.value = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

  if (!isMobile.value) {
    document.addEventListener('mouseup', handleSelection)
  }

  if (isMobile.value) {
    document.addEventListener('touchstart', handleVerseTouchStart)
    document.addEventListener('touchend', handleVerseTouchEnd)
  }

  scrollContainer = document.querySelector('.highlightMenu-scroll')
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', closeMenuOnScroll)
  }
})

onUnmounted(() => {
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', closeMenuOnScroll)
  }
})

const handleVerseTouchStart = (event) => {
  if (!isMobile) return

  const verseEl = event.target.closest('.verse')
  if (!verseEl) return

  touchStartVerse.value = Number(verseEl.dataset.vers)
}

const handleVerseTouchEnd = (event) => {
  if (!isMobile) return

  const verseEl = event.target.closest('.verse')
  if (!verseEl) return

  touchEndVerse.value = Number(verseEl.dataset.vers)

  const start = touchStartVerse.value
  const end = touchEndVerse.value

  if (!start || !end) return

  const min = Math.min(start, end)
  const max = Math.max(start, end)

  highlighterMenu.visible = true
  highlighterMenu.x = event.changedTouches[0].clientX
  highlighterMenu.y = event.changedTouches[0].clientY

  highlighterMenu.selectedVerses = { start: min, end: max }
}


// chapter Navigation
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

// swipe Navigation
const { handleTouchStart, handleTouchEnd } = useSwipeNavigation(
  nextChapter,
  previousChapter,
  goToChapter,
  direction
)

// keyboard Navigation
useKeyboardNavigation(nextChapter, previousChapter, goToChapter, direction)

// highlights
const {
  highlighterMenu,
  highlightColors,
  handleSelection,
  handleSelectionMobile,
  handleClickOutside,
  colorSelect,
  verseHighlight
} = useHighlight(data)

// scroll to verse
const { scrollToVerse } = useScroll(data)

</script>

<template>
  <section 
    class="highlightMenu-scroll w-auto h-auto overflow-x-hidden md:h-screen md:overflow-y-auto md:w-full md:pr-20" 
    @touchstart="handleTouchStart" 
    @touchend="(e) => { handleTouchEnd(e);  handleSelectionMobile(e)}"
    @mouseup="handleSelection"
    
  >
  <!--Menu flotante-->
  <transition name="fade-scale">
    <div 
      v-if="highlighterMenu.visible"
      class="highlighter-menu fixed z-[600] bg-bg2 border border-border2 shadow-xl 
      rounded-xl p-3 flex gap-2 items-center transition-opacity duration-300"
      @touchstart.stop
      @touchend.stop
      @click.stop
      :style="{top: highlighterMenu.y + 'px', left: highlighterMenu.x + 'px'}" 
    >
      <button
        v-for="color in highlightColors"
        :key="color"
        @click.stop="colorSelect(color)"
        @touchstart.stop="colorSelect(color)"
        @touchend.stop="colorSelect(color)"
        class="w-6 h-6 flex items-center justify-center rounded-full"
        :style="color !== 'transparent' ? { background: color } : {}"
      >
        <!-- Botón especial para transparente -->
        <template v-if="color === 'transparent'">
          <svg width="12" height="12" viewBox="0 0 24 24" stroke="#7a6f63" stroke-width="2" fill="none">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </template>
      </button>

    </div>
  </transition>
  
     <!-- content of book name, chapter and buttons to navigate between chapters -->
    <div class="items-center p-5 md:h-[120px] md:w-[70%] md:fixed md:top-[82px] flex md:justify-between bg-bg1 md:px-0 md:pl-5">
      <div>
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
          class="verse flex gap-3"
          :data-vers="index + 1"
          @touchstart="handleVerseTouchStart"
          @touchend="handleVerseTouchEnd"
        >
          <span class="font-bold font-lexendExa text-text2">
            {{ index + 1 }}
          </span>

          <p
            class="text-text1 text-[18px] md:text-[20px] font-lexendExa leading-[1.7] max-w-[65ch]"
            v-html="verseHighlight(index + 1, vers)"
          ></p>

        </div>
      </div>
    </Transition>

  </section>
</template>

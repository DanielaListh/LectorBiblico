<script setup>
import { useChapterNavigation } from '~/composables/useChapterNavigation';
import { useHighlight } from '~/composables/useHighlight';
import { useKeyboardNavigation } from '~/composables/useKeyboardNavigation';
import { useScroll } from '~/composables/useScroll';
import { useSwipeNavigation } from '~/composables/useSwipeNavigation';
import { booksMap } from '~/data/booksMap'


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
  handleClickOutside,
  colorSelect,
  verseHighlight
} = useHighlight(data)

// scroll to verse
const { scrollToVerse } = useScroll(data)

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
      class="highlighter-menu fixed z-[600] bg-bg2 border border-border2 shadow-xl 
      rounded-xl p-3 flex gap-2 items-center transition-opacity duration-300"
      :style="{top: highlighterMenu.y + 'px', left: highlighterMenu.x + 'px'}" 
    >
      <button
        v-for="color in highlightColors"
        :key="color"
        @click.stop="colorSelect(color)"
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

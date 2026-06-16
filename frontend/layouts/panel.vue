<script setup>
import Chapter from '~/components/Chapter.vue'
import Name from '~/components/Name.vue'
import NavDesk from '~/components/NavDesk.vue'
import { ref, onMounted } from 'vue'
import Player from '~/components/Player.vue'

const showChapter = ref(false)
const chapterHeight = ref(500)

onMounted(() => {
  const saved = localStorage.getItem('chapterHeight')

  if (saved) {
    chapterHeight.value = Number(saved)
  }
})

let startY = 0
let startHeight = 0

const startResize = (e) => {
  startY = e.clientY
  startHeight = chapterHeight.value

  document.body.style.userSelect = 'none'

  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', stopResize)
}

const resize = (e) => {
  const diff = e.clientY - startY

  chapterHeight.value = Math.max(150, Math.min(700, startHeight + diff))

}

const stopResize = () => {

  localStorage.setItem('chapterHeight', chapterHeight.value)

  document.body.style.userSelect = ''
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stopResize)
}

</script>

<template>
  <div class="md:flex md:w-full md:h-screen bg-main bg-cover bg-center">

    <aside class="hidden md:flex md:w-[20%] md:h-full md:flex-col">
      <Name  class="hidden md:block"/>
      <div class="w-full h-[4px] bg-bg2"></div>

      <div class="hidden md:block overflow-hidden"
          :style="{height: chapterHeight + 'px'}"
      >
        <Chapter/>
      </div>

      <div 
        class="hidden md:flex items-center justify-center h-5 cursor-ns-resize 
        hover:bg-bg4 transition"
        @mousedown.prevent="startResize"
      >
        <div class="w-full h-[4px] bg-bg2"></div>
      </div>
      
      <div class="hidden md:block flex-1 overflow-y-auto" >
        <Player />
      </div>
      

    </aside>

    <!-- drawer mobile -->
    <transition name="slide-chapter">
        <div
          v-if="showChapter"
          class="fixed top-[60px] left-0 h-auto w-[200px] max-w-[300px] 
          bg-bg2 shadow-xl z-[9999] rounded-xl overflow-y-hidden
          md:hidden"
        >
          <Chapter />
        </div>
      </transition>

    <div class="md:w-[3px] md:bg-bg2"></div>

    <!-- dynamic content -->
    <main class="w-full md:w-[80%] md:flex md:flex-col">
      <NavDesk 
        :showChapter="showChapter"
        @toggle-chapter="showChapter = !showChapter"
      />
      <div class="w-full h-[3px] bg-bg2"></div>
      <slot />
    </main>

  </div>
</template>

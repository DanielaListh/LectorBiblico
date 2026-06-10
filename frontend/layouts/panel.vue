<script setup>
import Chapter from '~/components/Chapter.vue'
import Name from '~/components/Name.vue'
import Reproductor from '~/components/Reproductor.vue'
import NavDesk from '~/components/NavDesk.vue'
import { ref } from 'vue'

const mostrarChapter = ref(false)

</script>

<template>
  <div class="md:flex md:w-full md:h-screen bg-main bg-cover bg-center">

    <aside class="hidden md:flex md:w-[20%] md:flex-col md:mx-auto">
      <Name  class="hidden md:block"/>
      <div class="w-full h-[4px] bg-bg2"></div>
      <Chapter class="hidden md:block" />
      <div class="w-full h-[4px] bg-bg2"></div>
      <Reproductor class="hidden md:block" />
    </aside>

    <!-- drawer mobile -->
    <transition name="slide-chapter">
        <div
          v-if="mostrarChapter"
          class="fixed top-[60px] left-0 h-auto w-[200px] max-w-[300px] 
          bg-bg2 shadow-xl z-[9999] rounded-xl overflow-y-hidden
          md:hidden"
        >
          <Chapter />
        </div>
      </transition>

    <div class="md:w-[3px] md:bg-bg2"></div>

    <!-- CONTENIDO DINÁMICO -->
    <main class="w-full md:w-[80%] md:flex md:flex-col">
      <NavDesk 
        :mostrarChapter="mostrarChapter"
        @toggle-chapter="mostrarChapter = !mostrarChapter"
      />
      <div class="w-full h-[3px] bg-bg2"></div>
      <slot />
    </main>

  </div>
</template>

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

    <!-- COLUMNA IZQUIERDA -->
    <aside class=" none md:flex md:w-[21%] md:flex-col">
      <Name  class="hidden md:block"/>
      <div class="w-full h-[4px] bg-bg2"></div>
        
        <Chapter v-if="mostrarChapter" class="block md:hidden" />
      <div class="w-full h-[4px] bg-bg2"></div>
      <Reproductor  class="hidden md:block" />
    </aside>

    <div class="md:w-[3px] md:bg-bg2"></div>

    <!-- CONTENIDO DINÁMICO -->
    <main class="md:w-[80%] md:flex md:flex-col">
      <NavDesk 
        :mostrarChapter="mostrarChapter"
        @toggle-chapter="mostrarChapter = !mostrarChapter"
      />
      <div class="w-full h-[3px] bg-bg2"></div>
      <slot />
    </main>

  </div>
</template>

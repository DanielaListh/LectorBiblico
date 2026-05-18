<script setup>
//import { L } from 'vue-router/dist/index-D_VEAp3P.js'
import Chapter from '~/components/Chapter.vue'
import Name from '~/components/Name.vue'
import Reproductor from '~/components/Reproductor.vue'
import NavDesk from '~/components/NavDesk.vue'


</script>

<template>
  <div class="flex w-full h-screen bg-[url('/img/fondo1.png')] bg-cover bg-center">

    <!-- COLUMNA IZQUIERDA -->
    <aside class="w-[20%] flex flex-col">
      <Name />
      <div class="w-full h-[4px] bg-[#beb093]"></div>
      <Chapter />
      <div class="w-full h-[4px] bg-[#beb093]"></div>
      <Reproductor />
    </aside>

    <div class="w-[3px] bg-[#beb093]"></div>

    <!-- CONTENIDO DINÁMICO -->
    <main class="w-[80%] flex flex-col">
      <NavDesk />
      <slot />
    </main>

  </div>
</template>

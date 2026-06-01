<script setup>
import Chapter from '~/components/Chapter.vue'
import Name from '~/components/Name.vue'
import Reproductor from '~/components/Reproductor.vue'
import NavDesk from '~/components/NavDesk.vue'


</script>

<template>
  <div class="flex w-full h-screen bg-main bg-cover bg-center">

    <!-- COLUMNA IZQUIERDA -->
    <aside class=" none md:flex md:w-[21%] md:flex-col">
      <Name />
      <div class="w-full h-[4px] bg-bg2"></div>
      <Chapter />
      <div class="w-full h-[4px] bg-bg2"></div>
      <Reproductor  />
    </aside>

    <div class="w-[3px] bg-bg2"></div>

    <!-- CONTENIDO DINÁMICO -->
    <main class="w-[80%] flex flex-col">
      <NavDesk />
      <div class="w-full h-[3px] bg-bg2"></div>
      <slot />
    </main>

  </div>
</template>

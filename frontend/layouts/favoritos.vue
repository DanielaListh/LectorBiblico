<script setup>
import { useRoute } from 'vue-router'
import Chapter from '~/components/Chapter.vue'
import Name from '~/components/Name.vue'
import Reproductor from '~/components/Reproductor.vue'

const route = useRoute()
const libro = route.params.libro // Obtiene el parámetro 'libro' de la URL
</script>

<template>
  <div class="flex w-full h-screen bg-[url('/img/fondo.png')] bg-cover bg-center">

    <!-- COLUMNA IZQUIERDA -->
    <div class="w-[20%] flex flex-col">
      <Name />
      <div class="h-[4px] bg-[#beb093]"></div>
      <Chapter />
      <div class="h-[4px] bg-[#beb093]"></div>
      <Reproductor />
    </div>

    <!-- BARRA DIVISORA vertical -->
    <div class="w-[3px] bg-[#beb093]"></div>

    <!-- COLUMNA DERECHA: aquí se renderiza la página -->
    <div class="flex-1 flex flex-col overflow-y-auto">
      <NavDesk />
    </div>

  </div>
</template>
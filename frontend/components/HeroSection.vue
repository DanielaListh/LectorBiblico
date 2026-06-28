<script setup>
import { RouterLink } from "vue-router";

const title = "La Biblia en un solo lugar";

const description =
  "Subraya versículos con diferentes colores, guarda tus favoritos, escucha música mientras lees y continúa exactamente donde te quedaste.";

const features = [
  "Sin registro",
  "Gratis",
  "Computadora",
  "Celular",
  "Lectrua continua",
  "Playlist de Spotify",
  "Favoritos",
  "Resaltados",
  "Notas",
  "Sin anuncios",
  "Diseño minimalista"
];
</script>

<template>
  <section id="home"
    class="w-full min-h-screen justify-center block mx-auto py-5"
  >
    <div class="max-w-4xl w-full flex flex-col items-center text-center mx-auto">

      <!-- Título -->
      <h1
        class="font-cinzel text-4xl md:text-5xl text-text1 font-bold transition-all duration-500 hover:text-hoverText1 md:mt-6"
      >
        {{ title }}
      </h1>

      <!-- Descripción -->
      <p
        class="mt-6 max-w-1xl text-lg text-text2 font-lexendExa"
      >
        {{ description }}
      </p>

      <!-- Boton -->
      <div class=" flex flex-col sm:flex-row gap-4 mt-3">

        <RouterLink to="/panel">
          <button
            class="px-10 py-4 rounded-xl bg-bg1 text-text1 hover:bg-bg3  text-lg font-semibold shadow-xl hover:scale-105 transition-all duration-300"
          >
            Comenzar a leer
          </button>
        </RouterLink>
      </div>

      <!-- Badges -->
      <div
        class="mt-8 flex flex-wrap justify-center gap-3 font-lexendExa text-sm"
      >
        <span
          v-for="item in features"
          :key="item"
          class="px-4 py-2 rounded-lg border-2 border-border1 text-text2 shadow"
        >
          {{ item }}
        </span>
      </div>

      

    </div>

    <div class="flex items-center justify-center w-[80%] mx-auto mt-10">
      <div class="w-16 bg-bg2 h-[3px]"></div>
      <img src="/img/pastor2.png" alt="El buen pastor" class="w-full h-[200px]">
      <div class="w-16 bg-bg2 h-[3px]"></div>
    </div>

  </section>

</template>

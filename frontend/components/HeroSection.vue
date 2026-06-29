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
  "Lectura continua",
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
        class="tittle-primary"
      >
        {{ title }}
      </h1>

      <!-- Descripción -->
      <p
        class="paragraph"
      >
        {{ description }}
      </p>

      <!-- Boton -->
      <div class=" flex flex-col sm:flex-row gap-4 mt-3">

        <RouterLink to="/panel">
          <button
            class="button-primary"
          >
            Comenzar a leer
          </button>
        </RouterLink>
      </div>

      <!-- Badges -->
      <div
        class="m-5 flex flex-wrap justify-center gap-2"
      >
        <span
          v-for="item in features"
          :key="item"
          class="badges"
        >
          {{ item }}
        </span>
      </div>

      

    </div>

    <div class="flex items-center justify-center w-[80%] md:h-[150px] lg:h-[200px] overflow-hidden mx-auto mt-5">
      <div class="w-16 bg-bg2 h-[3px]"></div>
      <img src="/img/pastor2.png" alt="El buen pastor" class="w-full h-full object-cover">
      <div class="w-16 bg-bg2 h-[3px]"></div>
    </div>

  </section>

</template>

<script setup>
import { RouterLink } from 'vue-router';

// Si luego querés hacerlo dinámico, podemos mover estos textos a props o a un archivo de contenido.
const title = "SANTA BIBLIA DIGITAL"
const subtitle = "Una fuente de Bendiciones Digital"
//para redireccionar a otra pag como /leer debemos por button
 

</script>

<template>
  
  <section id="home" class="w-full min-h-screen flex flex-col items-center">

  <div class="flex flex-col items-center text-center py-4 px-4">

    <h1 class=" font-cinzel text-4xl md:text-5xl text-text1 tracking-tight drop-shadow-sm hover:text-hoverText transition-all duration-700 hover:drop-shadow-[0_0_6px_#efcd9f]">
      {{ title }}
    </h1>

    <!-- imagen -->
    <div class="max-w-xs sm:max-w-sm md:max-w-lg">
      <img 
        src="/img/JesusCristo.png" 
        alt="Ilustración de JesusCristo buscando la oveja perdida"
        class="w-full object-contain"
      />
    </div>

    <RouterLink to="/panel">
      <button
        class="px-8 py-2 bg-bg4 text-text1 font-semibold rounded-lg shadow-lg hover:bg-bg3 transition-all duration-700"
      >
        Comenzar a leer
      </button>
    </RouterLink>

    <!-- SUBTÍTULO -->
    <p class="mt-6 text-text2 text-base sm:text-lg font-lexendExa max-w-xl">
      {{ subtitle }}
    </p>
  </div>

</section>

</template>

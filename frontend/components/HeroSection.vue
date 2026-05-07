<script setup>
// Si luego querés hacerlo dinámico, podemos mover estos textos a props o a un archivo de contenido.
const title = "SANTA BIBLIA DIGITAL"
const subtitle = "Una fuente de Bendiciones Digital"
</script>

<template>
  
  <section class="w-full min-h-screen flex flex-col items-center bg-[#faf6f3]">

    <!-- NAVBAR -->
    <nav class="w-[80%] font-lexendExa font-semibold max-w-6xl flex justify-end gap-8 py-6 text-[#5b493b]">
      <a href="#" class="hover:text-yellow-600 transition">Home</a>
      <a href="#" class="hover:text-yellow-600 transition">Búsqueda</a>
      <a href="#" class="hover:text-yellow-600 transition">FAQs</a>
      <a href="#" class="hover:text-yellow-600 transition">Login</a>
      
    </nav>

    <div class="w-full h-[3px] bg-[#ccc0a9]"></div>


    <!-- CONTENIDO CENTRAL -->
    <div class="flex flex-col items-center text-center mt-10 px-4">

      <!-- TÍTULO -->
      <h1 class="font-cinzel text-4xl md:text-6xl font-bold text-yellow-600 tracking-wide drop-shadow-sm">
        {{ title }}
      </h1>

      <!-- IMAGEN -->
      <div class="mt-10 max-w-md md:max-w-lg">
        <img 
          src="/img/portada.png" 
          alt="Ilustración de JesusCristo buscando la oveja perdida"
          class="w-full object-contain"
        />
      </div>

      <!-- BOTÓN -->
      <button
        class="mt-8 px-8 py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-700 transition"
      >
        Comenzar a leer
      </button>

      <!-- SUBTÍTULO -->
      <p class="mt-6 text-[#b0aba0] text-lg font-lexendExa">
        {{ subtitle }}
      </p>
    </div>

  </section>
</template>

<script setup>
// Si luego querés hacerlo dinámico, podemos mover estos textos a props o a un archivo de contenido.
const title = "SANTA BIBLIA DIGITAL"
const subtitle = "Una fuente de Bendiciones Digital"
</script>

<template>
  
  <section id="home" class="w-full min-h-screen flex flex-col items-center">

    <!-- NAVBAR -->
    <nav class="w-[80%] font-lexendExa font-semibold max-w-6xl flex justify-end gap-8 py-6 text-[#5b493b]">
      <a href="#home" class="hover:text-[#dbaf27] transition">Home</a>
      <a href="#busqueda" class="hover:text-[#dbaf27] transition">Búsqueda</a>
      <a href="#faq" class="hover:text-[#dbaf27] transition">FAQs</a>
      <a href="#audiencia" class="hover:text-[#dbaf27] transition">Audiencia</a>
      <a href="#donar" class="hover:text-[#dbaf27] transition">Donar</a>
      
    </nav>

    <div class="w-full h-[3px] bg-[#ccc0a9]"></div>


    <!-- CONTENIDO CENTRAL -->
    <div class="flex flex-col items-center text-center mt-10 px-4">

      <!-- TÍTULO -->
      <h1 class="mt-[30px] mb-[-100px] font-cinzel md:text-8xl text-[#dbaf27] tracking-tight drop-shadow-sm">
        {{ title }}
      </h1>

      <!-- IMAGEN -->
      <div class="max-w-md md:max-w-lg">
        <img 
          src="/img/JesusCristo.png" 
          alt="Ilustración de JesusCristo buscando la oveja perdida"
          class="w-full object-contain"
        />
      </div>

      <!-- BOTÓN -->
      <button
        class="px-8 py-3 bg-[#c5ae80] text-white font-semibold rounded-lg shadow-lg hover:bg-[#dbaf27] transition"
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

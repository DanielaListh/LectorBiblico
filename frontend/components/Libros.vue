<script setup>
import { mapaLibros } from '~/data/mapaLibros.js'

defineEmits(['select'])

const imagenesPorLibro = {
  genesis: "/img/libros/genesis.webp",
  exodus: "/img/libros/exodo.webp",
  leviticus: "/img/libros/levitico.webp",
  numbers: "/img/libros/numeros.webp",
  deuteronomy: "/img/libros/deuteronomio.webp",
  joshua: "/img/libros/josue.webp",
}
</script>

<template>
  <section class="w-full h-screen flex flex-wrap justify-center gap-4 overflow-y-auto p-3">

    <button
      v-for="slug in Object.keys(mapaLibros)"
      :key="slug"
      @click="$emit('select', slug)"
      class="relative group overflow-hidden w-[230px] h-[150px] rounded-[28px]
             border border-[#dcc16b]/40 bg-transparent transition-all duration-500
             hover:w-[230px] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(220,193,107,0.3)]
             hover:border-[#dcc16b]"
    >
      <img
        v-if="imagenesPorLibro[slug]"
        :src="imagenesPorLibro[slug]"
        class="absolute inset-0 w-full h-full object-cover opacity-0 scale-110
               transition-all duration-700 group-hover:opacity-100 group-hover:scale-100"
      >

      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
                  opacity-0 transition-all duration-700 group-hover:opacity-100"></div>

      <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500
                  bg-[#ffdc68]/20"></div>

      <div class="relative z-10 h-full flex items-end justify-start p-5">
        <p class="font-lexendExa text-xl text-[#5b493b] transition-all duration-500
                  group-hover:text-[#f8ead0] group-hover:drop-shadow-[0_0_8px_rgba(255,220,120,0.6)]">
          {{ mapaLibros[slug] }}
        </p>
      </div>
    </button>

  </section>
</template>

<script setup>
import { booksMap } from '~/data/booksMap'

defineEmits(['select'])

const imagesPerBook = {
  genesis: "/img/libros/genesis.webp",
  exodus: "/img/libros/exodo.webp",
  leviticus: "/img/libros/levitico.webp",
  numbers: "/img/libros/numeros.webp",
  deuteronomy: "/img/libros/deuteronomio.webp",
  joshua: "/img/libros/josue.webp",
}
</script>

<template>
  <section
    class="p-3 h-auto md:h-screen md:flex md:flex-wrap md:justify-center md:gap-4 md:overflow-y-auto"
  >

    <button
      v-for="slug in Object.keys(booksMap)"
      :key="slug"
      @click="$emit('select', slug)"

      class="
        block w-full text-center border-2 border-border2 text-text1 py-2 px-3 rounded-lg my-2
        font-lexendExa text-sm md:hover:bg-transparent group

        md:relative md:group md:overflow-hidden
        md:w-[230px] md:h-[150px] md:rounded-[25px]
        md:border md:border-border2 md:bg-transparent
        md:transition-all md:duration-500
        md:hover:-translate-y-1
        md:hover:shadow-[0_0_25px_rgba(220,193,107,0.3)]
        md:hover:border-hoverBorder2
      "
    >

      <img
        v-if="imagesPerBook[slug]"
        :src="imagesPerBook[slug]"
        class="
          hidden md:block
          absolute inset-0 w-full h-full object-cover opacity-0 scale-110
          transition-all duration-700 group-hover:opacity-100 group-hover:scale-100
        "
      >

      <!-- Overlays only in desktop -->
      <div
        class="hidden md:block absolute inset-0 bg-gradient-to-t from-black/20 via-black/20 to-transparent
               opacity-0 transition-all duration-700 group-hover:opacity-100"
      ></div>

      <div
        class="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500
               bg-[#ffdc68]/20"
      ></div>

      <!-- text -->
      <div
        class="
          relative z-10 text-center md:text-left
          md:absolute md:bottom-0 md:left-0 md:p-5 md:flex md:items-end
        "
      >
        <p
          class="
            font-lexendExa text-text2
            text-sm hover:text-text5
            md:text-xl md:transition-all md:duration-500
            md:group-hover:text-text5
            md:group-hover:drop-shadow-[0_0_8px_rgba(255,220,120,0.6)]
          "
        >
          {{ booksMap[slug] }}
        </p>
      </div>

    </button>

  </section>
</template>


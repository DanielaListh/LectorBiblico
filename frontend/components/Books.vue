<script setup>
import { booksMap } from '~/data/booksMap'
import {chapterPerBooks} from '~/data/chapters'

defineEmits(['select'])

const imagesPerBook = {
  genesis: "/img/libros/genesis.webp",
  exodus: "/img/libros/exodo.webp",
  leviticus: "/img/libros/levitico.webp",
  numbers: "/img/libros/numeros.webp",
  deuteronomy: "/img/libros/deuteronomio.webp",
  joshua: "/img/libros/josue.webp",
  // agrega los demás libros
}


const shortName = (slug) => {
  const cleanSlug = slug.replace(/\s+/g, '');

  if (/^\d/.test(cleanSlug)) {
    const [num, word] = cleanSlug.split('-');
    return num + word.slice(0, 2).toUpperCase(); // 1SA, 2KI, 1CH
  }

  return cleanSlug.slice(0, 3).toUpperCase();
};


</script>

<template>
  <section
    class="p-4 h-auto overflow-y-hidden md:h-screen md:overflow-y-auto bg-bg1"
  >
    <!-- Banner mobile -->
    <img src="/img/portadaMobile.png" alt="banner" class="block md:hidden mb-4 rounded-xl shadow-md">

    <!-- mobile: grid 2 columnas -->
    <div class="flex flex-col gap-3 w-full md:hidden">
      <button
        v-for="slug in Object.keys(booksMap)"
        :key="slug"
        @click="$emit('select', slug)"
        class="
          bg-bg2 rounded-xl p-3
          flex justify-content hover:bg-hoverBg
          focus:outline-none focus:ring-2 focus:ring-hoverBorder2
        "
      >
        <div class="w-[80px]">
          <p
            class="flex items-center justify-center w-[60px] h-[60px] bg-bg1 object-cover rounded-full m-2 text-text5 p-2 text-center font-lexendExa text-lx"
          >{{ shortName(slug) }}</p>
        </div>
        <div class="flex flex-col justify-center items-start gap-1">
          <p class="text-xl text-text2 font-lexendExa leading-tight font-semibold">{{ booksMap[slug] }}</p>
          <p
            class="text-base text-text3 font-lexendExa md:text-xl leading-tight">
            capitulos: {{ chapterPerBooks[slug]}}
          </p>
        </div>
        
      </button>
    </div>

    <!-- DESKTOP: grid 4 columnas con tu diseño original -->
    <div class="hidden md:grid md:grid-cols-4 md:gap-4 md:justify-center w-full">
      <button
        v-for="slug in Object.keys(booksMap)"
        :key="slug"
        @click="$emit('select', slug)"
        class="
          group relative w-full h-[150px] rounded-[25px]
          border border-border2 bg-transparent overflow-hidden
          transition-all duration-500 hover:-translate-y-1
          hover:shadow-[0_0_25px_rgba(220,193,107,0.3)]
          hover:border-hoverBorder2
        "
      >
        <!-- Imagen con hover -->
        <img
          v-if="imagesPerBook[slug]"
          :src="imagesPerBook[slug]"
          class="
            absolute inset-0 w-full h-full object-cover opacity-0 scale-110
            transition-all duration-700 group-hover:opacity-100 group-hover:scale-100
          "
        >

        <!-- Overlay oscuro -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/20 via-black/20 to-transparent
                 opacity-0 transition-all duration-700 group-hover:opacity-100"
        ></div>

        <!-- Overlay dorado -->
        <div
          class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500
                 bg-[#ffdc68]/20"
        ></div>

        <!-- Texto -->
        <div
          class="absolute bottom-0 left-0 p-5 flex items-end z-10"
        >
          <p
            class="
              font-lexendExa text-text5 text-lx transition-all duration-500
              group-hover:text-text4 group-hover:drop-shadow-[0_0_8px_rgba(255,220,120,0.6)]
            "
          >
            {{ booksMap[slug] }}
          </p>
        </div>
      </button>
    </div>
  </section>
</template>





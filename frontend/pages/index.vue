<script setup>
import { RouterLink } from 'vue-router';
import { useTheme } from '~/composables/useTheme'

const { toggleTheme } = useTheme()
</script>

<template>

  <div class="relative bg-main bg-cover bg-center">

    <nav class="font-lexendExa font-semibold flex justify-center items-center py-3 
      md:flex-wrap md:px-[100px] md:justify-between 
      top-0 sticky z-[100] bg-main backdrop-blur-lg 
      border-border2 border-[3px] ">

      <div>
        <RouterLink to="/">
          <button>
            <span src="img/logo-dark.png" class="logo h-[50px]"></span>
          </button>
        </RouterLink>
      </div>

      <div class="hidden gap-4 md:flex justify-between text-text1">
        <a href="#home" class="hover:text-hoverText1 transition-colors duration-300">Inicio</a>
        <a href="#search" class="hover:text-hoverText1 transition-colors duration-300">Búsqueda</a>
        <a href="#faq" class="hover:text-hoverText1 transition-colors duration-300">Dudas</a>
        <a href="#audience" class="hover:text-hoverText1 transition-colors duration-300">Audiencia</a>
        <a href="#donate" class="hover:text-hoverText1 transition-colors duration-300">Donar</a>
      </div>

      <div class="hidden md:block">
        <button @click="toggleTheme">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 icon-line"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9.173 14.83a4 4 0 1 1 5.657 -5.657" />
            <path d="M11.294 12.707l.174 .247a7.5 7.5 0 0 0 8.845 2.492a9 9 0 0 1 -14.671 2.914" />
            <path d="M3 12h1" />
            <path d="M12 3v1" />
            <path d="M5.6 5.6l.7 .7" />
            <path d="M3 21l18 -18" />
          </svg>
        </button>
      </div>
      
    </nav> 
    
    <div class="hidden md:flex absolute top-0 bottom-0 left-[5%] w-[3px] bg-bg2"></div>
    <div class="hidden md:flex absolute top-0 bottom-0 right-[5%] w-[3px] bg-bg2"></div>
    <HeroSection />
    <Search />
    <Faq />
    <Audience />
    <Ko-fi />
    <div class="h-[3px] bg-bg2"></div>
    <Footer />
    
  </div>
</template>

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

      <div class="hidden gap-4 md:flex justify-between">
        <a href="#home" class="text-text1 hover:text-hoverText transition">Home</a>
        <a href="#search" class="text-text1 hover:text-hoverText transition">Búsqueda</a>
        <a href="#faq" class="text-text1 hover:text-hoverText transition">FAQs</a>
        <a href="#audience" class="text-text1 hover:text-hoverText transition">Audiencia</a>
        <a href="#donate" class="text-text1 hover:text-hoverText transition">Donar</a>
      </div>

      <div class="hidden md:block">
        <button @click="toggleTheme">
          <img class="theme-icon w-8 " alt="tema" />
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

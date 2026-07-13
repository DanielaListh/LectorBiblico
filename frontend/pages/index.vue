<script setup>
import { useTheme } from '~/composables/useTheme'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const menuOpen = ref(false)
const menuRef = ref(null)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

const clickOutsideMenu = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', clickOutsideMenu)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', clickOutsideMenu)
})

const { toggleTheme } = useTheme()
</script>

<template>

  <div class="relative bg-main bg-cover bg-center">

    <nav class="font-lexendExa font-semibold flex items-center py-3 
      md:flex-wrap md:px-[100px] justify-between 
      top-0 sticky z-[100] bg-main backdrop-blur-lg 
      border-border1 border-b-[3px] px-3">

      <div>
        <NuxtLink to="/">
          <button class="focus:outline-none focus:ring-0">
            <span src="img/logo-dark.png" class="logo h-[50px]"></span>
          </button>
        </NuxtLink>
      </div>

      <div ref="menuRef" class="relative md:hidden">
        <!-- Botón hamburguesa -->
        <button
          @click.stop="toggleMenu"
          class="text-text3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon-line hover:stroke-iconStrokeHover"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
        </button>

        <!-- Menú -->
        <Transition name="fade">
          <div
            v-if="menuOpen"
            class="absolute right-0 top-6 border border-border2 bg-bg2 shadow-xl
            w-[150px] font-lexendExa mt-2 rounded-lg
            p-3 flex flex-col gap-2 transition-all duration-300 z-50"
          >
            <a
              href="#home"
              @click="closeMenu"
              class="text-text3 hover:text-hoverText1 transition-colors"
            >
              Inicio
            </a>

            <a
              href="#search"
              @click="closeMenu"
              class="text-text3 hover:text-hoverText1 transition-colors"
            >
              Búsqueda
            </a>

            <a
              href="#faq"
              @click="closeMenu"
              class="text-text3 hover:text-hoverText1 transition-colors"
            >
              Dudas
            </a>

            <a
              href="#audience"
              @click="closeMenu"
              class="text-text3 hover:text-hoverText1 transition-colors"
            >
              Audiencia
            </a>

            <a
              href="#donate"
              @click="closeMenu"
              class="text-text3 hover:text-hoverText1 transition-colors"
            >
              Donar
            </a>
          </div>
        </Transition>
      </div>


      <div class="hidden gap-4 md:flex justify-between text-text3">
        <a href="#home" class="hover:text-hoverText1 transition-colors duration-300">Inicio</a>
        <a href="#search" class="hover:text-hoverText1 transition-colors duration-300">Búsqueda</a>
        <a href="#faq" class="hover:text-hoverText1 transition-colors duration-300">Dudas</a>
        <a href="#audience" class="hover:text-hoverText1 transition-colors duration-300">Audiencia</a>
        <a href="#donate" class="hover:text-hoverText1 transition-colors duration-300">Donar</a>
      </div>

      <div class="hidden md:block">
        <button @click="toggleTheme" class="focus:outline-none focus:ring-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-10 h-10 hover:stroke-iconStrokeHover"
            color="var(--icon-stroke)"
            stroke="currentColor"
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
    
    <div class="hidden md:flex absolute top-0 bottom-0 left-[5%] w-[3px] bg-bg4"></div>
    <div class="hidden md:flex absolute top-0 bottom-0 right-[5%] w-[3px] bg-bg4"></div>
    <HeroSection />
    <Search />
    <Faq />
    <Audience />
    <Ko-fi />
    <div class="h-[3px] bg-bg4"></div>
    <Footer />
    
  </div>
</template>

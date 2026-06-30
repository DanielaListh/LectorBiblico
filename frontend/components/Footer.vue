<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

</script>

<template>
    <footer class="w-[85%] mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-center mt-4 gap-4 md:gap-0">
            <!-- ICONOS -->
            <div class="flex justify-center items-center mt-2 md:mt-4 gap-4">
                <a href="https://www.linkedin.com/in/daniela-berrios/" target="_blank" class="icon-redes">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon-line"
                    viewBox="0 0 24 24"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    >
                        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                        <path d="M8 11l0 5" />
                        <path d="M8 8l0 .01" />
                        <path d="M12 16l0 -5" />
                        <path d="M16 16v-3a2 2 0 0 0 -4 0" />
                    </svg>
                </a>
                <a href="https://github.com/DanielaListh" target="_blank" class="icon-redes">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon-line"
                    viewBox="0 0 24 24"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    >
                        <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 
                        -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 
                        12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 
                        -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                    </svg>
                </a>
                <a href="https://www.facebook.com/Dani.listh/" target="_blank" class="icon-redes">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon-line"
                    viewBox="0 0 24 24"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    >
                    <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                    </svg>

                </a>
            </div>

            <!-- LINKS -->
            <div class="flex flex-wrap justify-center md:justify-end m-[10px] font-lexendExa text-text1 gap-3 font-semibold">
                <a href="#home" class="hover:text-hoverText1 transition-colors duration-300">Inicio</a>
                <a href="#busqueda" class="hover:text-hoverText1 transition-colors duration-300">Búsqueda</a>
                <a href="#faq" class="hover:text-hoverText1 transition-colors duration-300">Dudas</a>
                <a href="#audiencia" class="hover:text-hoverText1 transition-colors duration-300">Audiencia</a>
                <a href="#donar" class="hover:text-hoverText1 transition-colors duration-300">Donar</a>
            </div>

        </div>

        <!-- TEXTO FINAL -->
        <div class="flex justify-center items-center mt-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon-line"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8d6e63"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                >
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
            <p class="font-lexendExa text-text1 text-center m-2 items-center">Creado con cariño por Daniela Berrios</p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon-line"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8d6e63"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                >
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
        </div>
        <div class="h-[30px]"></div>
    </footer>
</template>
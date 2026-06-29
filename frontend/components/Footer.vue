<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

</script>

<template>
    <footer class="w-[85%] mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-center mt-4 gap-4 md:gap-0">
            <!-- ICONOS -->
            <div class="flex justify-center items-center mt-2 md:mt-4 gap-4">
                <a href="https://www.linkedin.com/in/daniela-berrios/" target="_blank" class="icon-redes">
                    <FontAwesomeIcon :icon="['fab', 'linkedin-in']" />
                </a>
                <a href="https://github.com/DanielaListh" target="_blank" class="icon-redes">
                    <FontAwesomeIcon :icon="['fab', 'github']" />
                </a>
                <a href="https://www.facebook.com/Dani.listh/" target="_blank" class="icon-redes">
                    <FontAwesomeIcon :icon="['fab', 'facebook-f']" />
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
            <img src="/img/heart.png" alt="corazon" class="w-4 mr-2">
            <p class="font-cinzel text-text1 text-center">Creado con cariño por Daniela Berrios</p>
            <img src="/img/heart.png" alt="corazon" class="w-4 ml-2">
        </div>
        <div class="h-[30px]"></div>
    </footer>
</template>
<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

</script>

<template>

    <footer class="w-[85%] mx-auto">
        
        <div class=" flex justify-between items-center mt-4">
            <div class="flex justify-center items-center mt-4">
                <a href="https://www.linkedin.com/in/daniela-berrios/" target="_blank" class="icon-redes">
                    <FontAwesomeIcon :icon="['fab', 'linkedin-in']" />
                </a>
                <a href="https://github.com/DanielaListh" target="_blank" class="icon-redes">
                    <FontAwesomeIcon :icon="['fab', 'github']" />
                </a>
                <a href="https://www.facebook.com/Dani.listh/" target="_blank" class="icon-redes">
                    <FontAwesomeIcon :icon="['fab', 'facebook-f']" />
                </a>
                <a href="https://www.instagram.com/liseth.dbh/" target="_blank" class="icon-redes">
                    <FontAwesomeIcon :icon="['fab', 'instagram']" />
                </a>
            </div>
            <div class=" justify-end m-[10px] font-lexendExa text-[#5b493b] flex gap-2 font-semibold">
                <a href="" class="hover:text-[#eb9d36] transition-colors duration-300">Home</a>
                <a href="" class="hover:text-[#eb9d36] transition-colors duration-300">Buscar</a>
                <a href="" class="hover:text-[#eb9d36] transition-colors duration-300">FAQ</a>
                <a href="" class="hover:text-[#eb9d36] transition-colors duration-300">Donar</a>
            </div>
        </div>
            
        <div class="flex justify-center items-center">
            <p class="font-cinzel text-[#836e53]">🧡 HECHO POR DANIELA BERRIOS 🧡</p>
        </div>
        <div class="h-[30px]"></div>
        
    </footer>

</template>
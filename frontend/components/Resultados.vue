<script setup>
import { mapaLibros } from '~/data/mapaLibros';

defineProps({
    resultados: Array,
    busqueda: String
})

defineEmits(['select'])// realiza la emisión del evento 'select' al hacer clic en un resultado
</script>

<template>
    <div class="absolute top-[45px] left-0 w-[200px] max-h-[300px] overflow-y-auto z-50
             rounded-lg bg-bg1 blackdrop-blur-md border-2 border-border1 p-2">
        <div v-if="resultados.length > 0">
            <button
                v-for="libro in resultados"
                :key="libro"
                @click="$emit('select', libro)"
                class=" w-full text-left px-4 py-2 rounded-xl text-text1 hover:bg-bg3 transition"
            >
            {{ mapaLibros[libro]}}
            </button>
        </div>
        <div 
            v-else
            class="text-center text-placeholder py-1"
        >
        No se encontraron resultados
        </div>
        
    </div>
</template>


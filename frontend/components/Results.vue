<script setup>
import { booksMap } from '~/data/booksMap';

const props = defineProps({
    results: Array,
    search: String,
    activeIndex: Number
})

defineEmits(['select'])// realiza la emisión del evento 'select' al hacer clic en un resultado

</script>

<template>
    <div class="absolute top-[45px] left-0 w-[200px] max-h-[300px] overflow-y-auto z-50
             rounded-lg bg-bg2 blackdrop-blur-md border-2 border-border1 p-2">
        <div v-if="results.length > 0">
            <button
                v-for="(book, index) in results"
                :key="book"
                @click="$emit('select', book)"
                class=" w-full text-left px-4 py-2 rounded-xl transition"
                :class="[
                    index === activeIndex
                        ? 'bg-hoverText1 text-bg2 font-semibold'
                        : 'text-text1 hover:bg-bg3' 
                ]"
            >
            {{ booksMap[book]}}
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


<script setup>
defineProps({
  resultados: Array
})

defineEmits(['select'])// realiza la emisión del evento 'select' al hacer clic en un resultado
</script>

<template>
    <div class="absolute top-[45px] left-0 w-[200px] max-h-[300px] overflow-y-auto z-50
             rounded-lg bg-[#fff]/90 blackdrop-blur-md border-2 border-[#5b493b] p-2">
        <button
            v-for="r in resultados"
            :key="r"
            @click="$emit('select', r)"
            class=" w-full text-left px-4 py-2 rounded-xl text-[#5b493b] hover:bg-[#dcc16b]/20 transition"
        >
         {{ r }}
        </button>
    </div>
</template>


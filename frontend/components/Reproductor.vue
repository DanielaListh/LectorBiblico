<script setup>
import { ref } from 'vue'

const url = ref('')
const embedUrl = ref('https://open.spotify.com/playlist/1GXbpYP2LZYAUigQuD0vuN?si=NMHrKQNeSSWw7pfJNlbLpQ')

const generarEmbed = () => {

  if (!url.value) return

    try {

        // separa la URL
        const partes = url.value.split('/')

        // obtiene playlist
        const tipo = partes[3]

        // obtiene ID sin parámetros
        const id = partes[4]?.split('?')[0]

        if (!tipo || !id) return

        embedUrl.value =
        `https://open.spotify.com/embed/${tipo}/${id}`

    } catch(error) {
        console.log(error)
    }
}
</script>
<template>
    <div class="h-[3px] bg-[#beb093]"></div>
    <div class="flex flex-col p-2 gap-1 max-h-[300px]">
        <input 
        v-model="url"
        @input="generarEmbed"
        type="text"
        placeholder="Url de Spotify"
        class="border-2 p-1 rounded-lg border-[#5b493b] bg-transparent focus:outline-none text-center text-[#9d8d6b]"
        >
        <iframe
            v-if="embedUrl" 
            :src="embedUrl"
            width="100%"
            height="352" 
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowfullscreen
            allowtransparency="true"
            loading="lazy"
            class="rounded-xl"
        ></iframe>
    </div>
</template>
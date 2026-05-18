<script setup>
import { ref } from 'vue'

const url = ref('')
const embedUrl = ref('https://open.spotify.com/playlist/1GXbpYP2LZYAUigQuD0vuN?si=NMHrKQNeSSWw7pfJNlbLpQ')

const generarEmbed = () => {

  if (!url.value) return

  const regex =
    /https:\/\/open\.spotify\.com\/(playlist|track|album|artist)\/([a-zA-Z0-9]+)/

  const match = url.value.match(regex)

  if (!match) return

  const tipo = match[1]
  const id = match[2]

  embedUrl.value =
    `https://open.spotify.com/embed/${tipo}/${id}`
}

</script>
<template>
    
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
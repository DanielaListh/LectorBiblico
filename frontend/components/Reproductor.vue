<script setup>
    import { ref } from 'vue'

    
    const embedUrl = ref('')

    const url = ref('')
    const generarEmbed = () => {
        if (!url.value) return

        const base = url.value.replace("open.spotify.com/", "open.spotify.com/embed/")
        embedUrl.value = base
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
            height="auto" 
            frameborder="0"
            allow="autoplay; clipboard-white; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            class="rounded-xl"
        ></iframe>
    </div>
</template>
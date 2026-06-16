<script setup>
import { ref, onMounted } from 'vue'

const url = ref('')
const embedUrl = ref('')

onMounted(() => {
  const savedUrl = localStorage.getItem('spotifyUrl')

  if (savedUrl) {
    url.value = savedUrl
    generateEmbed()
  }
})

const generateEmbed = () => {
  if (!url.value) return

  const regex =
    /https:\/\/open\.spotify\.com\/(playlist|track|album|artist)\/([a-zA-Z0-9]+)(\?.*)?/

  const match = url.value.match(regex)

  if (!match) return

  const tipo = match[1]
  const id = match[2]

  embedUrl.value =
    `https://open.spotify.com/embed/${tipo}/${id}`

  localStorage.setItem('spotifyUrl', url.value)
}
</script>

<template>

    <div class="flex flex-col gap-2 p-2">

      <input 
        v-model="url"
        @input="generateEmbed"
        type="text"
        placeholder="Url de playlist Spotify aquí"
        class="border-2 p-1 rounded-lg border-border1 bg-transparent focus:outline-none text-center text-text1 placeholder-placeholder"
      >

      <iframe
        :src="embedUrl"
         width="100%"
         height="352"
         frameborder="0"
         allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
         loading="lazy"
         class="rounded-xl"
      ></iframe>


    </div>

</template>

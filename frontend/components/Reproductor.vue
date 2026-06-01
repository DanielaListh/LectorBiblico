<script setup>
import { ref, onMounted } from 'vue'

const url = ref('')
const embedUrl = ref('')



//cargar la ultima url con altura del reproductor
onMounted(() => {
  const savedUrl = localStorage.getItem('spotifyUrl')
  const savedHeight = localStorage.getItem('playerHeight')

  if (savedUrl) {
    url.value = savedUrl
    generarEmbed()
  }

  if (savedHeight) {
    height.value = Number(savedHeight)
  }

})

const generarEmbed = () => {
  if (!url.value) return

  const regex = /https:\/\/open\.spotify\.com\/(playlist|track|album|artist)\/([a-zA-Z0-9]+)(\?.*)?/

  const match = url.value.match(regex)

  if (!match) return

  const tipo = match[1]
  const id = match[2]

  embedUrl.value = `https://open.spotify.com/embed/${tipo}/${id}`

  localStorage.setItem('spotifyUrl', url.value) //guardar url en localStorage
}

//resize

const height = ref(352) // altura inicial REAL mínima de Spotify
let startY = 0
let startHeight = 0

const startResize = (e) => {
  startY = e.clientY
  startHeight = height.value

  document.body.style.userSelect = 'none'

  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', stopResize)
}


const resize = (e) => {
  //const diff = e.clientY - startY
  const diff = startY - e.clientY
  let newHeight = startHeight + diff

  //clamp 
  newHeight = Math.max(352, Math.min(800, newHeight))

  height.value = newHeight
  localStorage.setItem('playerHeight', newHeight)
}

const stopResize = () => {
  document.body.style.userSelect = ''
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stopResize)
}
</script>

<template>

    <div 
      class=" relative flex flex-col gap-2 p-2"
      :style="embedUrl ? { height: height + 'px' } : {}"
    >

      <input 
        v-model="url"
        @input="generarEmbed"
        type="text"
        placeholder="Url de playlist Spotify aquí"
        class="border-2 p-1 rounded-lg border-border1 bg-transparent focus:outline-none text-center text-text1 placeholder-placeholder"
      >

      
      <div v-if="embedUrl" class="relative flex-1">

        <!-- resize -->
        <div @mousedown.prevent="startResize"
          class="absolute top-0 left-0 w-full h-3 z-50 py-2 cursor-ns-resize bg-bg3 rounded-xl transition"

        ></div>

        <iframe
          :src="embedUrl"
          width="100%"
          height="100%"
          frameborder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          class="rounded-xl"
        ></iframe>

      </div>

    </div>

</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { capitulosPorLibro } from '~/data/capitulos'

const route = useRoute()
const router = useRouter()

// REACTIVO
const libro = computed(() => route.params.libro)

const capituloActual = computed (() => Number(route.params.capitulo))

const totalCapitulos = computed(() => {
  return capitulosPorLibro[libro.value] || 0
})

const capitulos = computed(() =>
  Array.from(
    { length: totalCapitulos.value },
    (_, i) => i + 1
  )
)

const irCapitulo = (num) => {
  router.push(`/panel/libros/${libro.value}/${num}`)
}
</script>

<template>
  <div class="h-[350px] flex flex-col gap-2 p-4 overflow-y-auto text-center">

    
    <template v-if="capitulos.length > 0">
      <button
        v-for="cap in capitulos"
        :key="cap"
        @click="irCapitulo(cap)"
        class="text-left px-4 font-lexendExa rounded-lg transition duration-300 text-text1"
        :class="cap === capituloActual ? 'bg-bg3 text-text3 font-bold' : 'hover:text-hoverText' "
      >
        Capítulo {{ cap }}
      </button>
    </template>

    <div v-else class="flex flex-col justify-center items-center mx-auto p-1">
      <h2 class="font-lexendExa text-center text-text1">
        Al seleccionar un libro podrás ver un listado de los capítulos
      </h2>
      <img src="/img/heart.png" alt="corazon color beige" class="mt-2">
    </div>

  </div>
</template>

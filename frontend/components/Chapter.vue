<script setup>
//import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { capitulosPorLibro } from '~/data/capitulos'

const route = useRoute()
const router = useRouter()

const libro = route.params.libro // Obtiene el parámetro 'libro' de la URL
const totalCapitulos = capitulosPorLibro[libro] || 0 // Obtiene el número total de capítulos para el libro, o 0 si no se encuentra

const capitulos = Array.from({ length: totalCapitulos }, (_, i) => i + 1) // Crea un array con los números de capítulos disponibles

const irCapitulo = (num) => {
  router.push(`/leer/${libro}/${num}`) // Navega a la ruta del capítulo seleccionado
}

console.log(libro);
console.log(totalCapitulos);

</script>

<template>

  <div class="h-[350px] flex flex-col gap-2 p-4 overflow-y-auto">

    <button
      v-if="cap"
      v-for="cap in capitulos"
      :key="cap"

      @click="irCapitulo(cap)"

      class="text-left px-4 py-2 rounded-lg hover:bg-[#dcc16b]/20 transition"
    >
      Capítulo {{ cap }}
    </button>

    <div v-else class="flex flex-col justify-center items-center mx-auto p-1">
      <h2 class="font-lexendExa text-center text-[#5b493b]">
        Al seleccionar un libro podras ver un listado de los capitulos
      </h2>
      <img src="/img/heart.png" alt="corazon color beige" class="mt-2">
    </div>
    

  </div>

</template>

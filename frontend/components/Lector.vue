<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { mapaLibros } from '~/data/mapaLibros'
import { computed } from 'vue'


const route = useRoute() 
const router = useRouter()

const libro = computed (() => route.params.libro)

//const libroApi = mapaLibros[libroSlug] //

const data = ref({
  verses: []
}) // aquí se guardará la información del capítulo cargado

const cargarCapitulo = async () => {
  
  const capitulo = computed (() => route.params.capitulo)

  try {
    const res = await fetch(`https://api.midvash.com/v1/rvr1960/${libro.value}/${capitulo.value}`)
    const json = await res.json()
    data.value = json.data 
    console.log(data.value)
  } catch (e){
    console.error("Error al cargar el capitulo: ",)
  }
}

onMounted(cargarCapitulo)

watch(
  () => route.fullPath,
  () => { cargarCapitulo() }
)

const irACapitulo = (num) => {
  router.push(`/panel/libros/${libro.value}/${num}`)
}



</script>

<template>
  <section class="w-full h-screen text-[#5b493b] px-10 py-12 overflow-y-auto">

    <div>

      <!-- TÍTULO -->
    <h1
      class="text-5xl font-bold font-lexendExa mb-2 capitalize"
    >
      {{ mapaLibros[libro]}}
    </h1>

    <!-- SUBTÍTULO -->
    <h2
      v-if="data?.chapter"
      class="text-2xl font-semibold text-[#8a775f] mb-8"
    >
      Capítulo {{ data.chapter }}
    </h2>

    <!-- CONTENIDO -->
    <div class="flex flex-col gap-6 leading-relaxed text-lg max-w-3xl">

      <div
        v-for="(vers, index) in data?.verses || []"
        :key="index"
        class="flex gap-3"
      >
        <span class="font-bold text-[#d2a85a]">
          {{ index + 1 }}
        </span>

        <p class="text-[#5b493b]">
          {{ vers }}
        </p>
      </div>

    </div>

    <!-- NAVEGACIÓN -->
    <div class="flex justify-between mt-12 max-w-3xl">

      <button
    
      >
        ← Capítulo anterior
      </button>

      <button
        
      >
        Siguiente capítulo →
      </button>

    </div>

    </div>

  </section>
</template>

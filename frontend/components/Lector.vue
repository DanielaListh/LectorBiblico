<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { mapaLibros } from '~/data/mapaLibros'
import { computed } from 'vue'
import { capitulosPorLibro } from '~/data/capitulos'


const route = useRoute() 
const router = useRouter()

const libro = computed(() => route.params.libro)
const capitulo = computed(() => Number(route.params.capitulo))
const totalCapitulos = computed(() => capitulosPorLibro[libro.value])
const previousChapter = computed(() => { return capitulo.value > 1 ? capitulo.value - 1 : null }) // si el capitulo es mayor a uno entonces el valor del capitulo es - 1 sino es nulo
const nextChapter = computed(() => { return capitulo.value < totalCapitulos.value ? capitulo.value + 1 : null })
const cargando = ref(true)


const data = ref({
  verses: []
}) // aquí se guardará la información del capítulo cargado

const cargarCapitulo = async () => {
  cargando.value = true

  try {
    const res = await fetch(`https://api.midvash.com/v1/rvr1960/${libro.value}/${capitulo.value}`)
    const json = await res.json()
    data.value = json.data 
    console.log(data.value)
  } catch (e){
    console.error("Error al cargar el capitulo: ",)
  }
  cargando.value = false
}

onMounted(cargarCapitulo)

watch(
  () => route.fullPath,
  () => { cargarCapitulo() }
)

const irACapitulo = async (num) => {
  await router.push(`/panel/libros/${route.params.libro}/${num}`)

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })

}



</script>

<template>
  <Transition name="fade">
    <section class="md:w-full md:h-screen md:overflow-y-auto">

      

        <!-- Contenedor de Nombre de Libro, Capitulo y botones de navegacion entre capitulos-->
        <div class="
          items-center px-5 py-4
          md:flex md:justify-between md:sticky md:top-0 md:px-10 md:py-6 md:bg-main ">
          <div>
            <h1
              class="text-3xl font-bold font-lexendExa text-text1 md:text-5xl"
            >
              {{ mapaLibros[libro]}}
            </h1>

            <h2
              v-if="data?.chapter"
              class="font-lexendExa  text-1xl font-semibold text-text1 md:mt-4 md:text-2xl"
            >
              Capítulo {{ data.chapter }}
            </h2>
          </div>
          

          <!-- permitir navegacion mobile con el tactil -->
          <div class=" hidden md:flex md:justify-end md:gap-5 ">
            <button 
              v-if="previousChapter"
              @click="irACapitulo(previousChapter)">
              <img src="/img/flechaIzq.png" alt="Anterior"class="w-[30px]">
            </button>
            <button
              v-if="nextChapter" 
              @click="irACapitulo(nextChapter)">
              <img src="/img/flechaDer.png" alt="Siguiente" class="w-[30px]">
            </button>
          </div>

        </div>

        <!-- loader -->
        <div v-if="cargando" class="px-10 animate-pulse">
          <div class="h-6 w-1/6 bg-bg3 rounded mb-12"></div>
          <div class="h-6 w-4/6 bg-bg4 rounded mb-4"></div>
          <div class="h-6 w-3/6 bg-bg4 rounded mb-4"></div>
          <div class="h-6 w-5/6 bg-bg4 rounded mb-4"></div>
          <div class="h-6 w-3/6 bg-bg4 rounded mb-4"></div>
          <div class="h-6 w-4/6 bg-bg4 rounded mb-4"></div>
          <div class="h-6 w-3/6 bg-bg4 rounded mb-4"></div>
          <div class="h-6 w-5/6 bg-bg4 rounded mb-4"></div>
          <div class="h-6 w-3/6 bg-bg4 rounded mb-4"></div>
        </div>
        
        <!-- contenedor de versiculos -->
        <div
          v-if="!cargando" 
          class="pl-5 flex flex-col gap-2 leading-relaxed text-lg md:max-w-4xl md:px-10 md:pt-3 md:pb-12"
        >
          <div
            v-for="(vers, index) in data?.verses || []"
            :key="index"
            class="flex gap-3"
          >
            <span class="font-bold font-lexendExa text-text2">
              {{ index + 1 }}
            </span>

            <p class="text-text1 font-lexendExa">
              {{ vers }}
            </p>
          </div>
        </div>


    </section>
  </Transition>
  
</template>

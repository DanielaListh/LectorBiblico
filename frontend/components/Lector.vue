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



const data = ref({
  verses: []
}) // aquí se guardará la información del capítulo cargado

const cargarCapitulo = async () => {

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
    <section class="w-full h-screen overflow-y-auto">

      

        <!-- Contenedor de Nombre de Libro, Capitulo y botones de navegacion entre capitulos-->
        <div class="flex justify-between items-center sticky top-0 bg-[url('/img/fondo1.png')] px-10 py-6 ">
          <div>
            <h1
              class="text-5xl font-bold font-lexendExa text-[#5b493b]"
            >
              {{ mapaLibros[libro]}}
            </h1>

            <h2
              v-if="data?.chapter"
              class="font-lexendExa text-2xl font-semibold text-[#8a775f]"
            >
              Capítulo {{ data.chapter }}
            </h2>
          </div>
          

          <!-- NAVEGACIÓN -->
          <div class="flex justify-end gap-5 ">
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
        
        <!-- contenedor de versiculos -->
        <div class="flex flex-col gap-2 leading-relaxed text-lg max-w-4xl px-10 pt-3 pb-12">

          <div
            v-for="(vers, index) in data?.verses || []"
            :key="index"
            class="flex gap-3"
          >
            <span class="font-bold font-lexendExa text-[#d2a85a]">
              {{ index + 1 }}
            </span>

            <p class="text-[#5b493b] font-lexendExa">
              {{ vers }}
            </p>
          </div>

        </div>


    </section>
  </Transition>
  
</template>

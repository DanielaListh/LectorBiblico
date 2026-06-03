<script setup>
  import { ref, computed, provide } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import Libros from '~/components/Libros'
  import Resultados from '~/components/Resultados'
  import { useTheme } from '~/composables/useTheme'
  import { mapaLibros } from '~/data/mapaLibros'
  
defineProps({
    mostrarChapter: Boolean
})

const emit = defineEmits(['toggle-chapter'])

  const route = useRoute()
  const router = useRouter()

  const busqueda = ref('')


  //const mostrarChapter = inject('mostrarChapter')

  const normalizar = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  
  const libros = Object.keys(mapaLibros)

  const librosFiltrados = computed(() => {
    if (!busqueda.value) return libros

    return libros.filter( libro =>
      normalizar(mapaLibros[libro] || libro)
        .includes(normalizar(busqueda.value))
    )
  })

  const esRutaLeer = computed(() => route.path === '/panel/libros')

  const irLibro = (libro) => {
    busqueda.value = ''
    router.push(`/panel/libros/${libro}/1`)
  }


  const { toggleTheme } = useTheme() 
  
</script>

<template>
  <section class="flex px-[30px] md:h-[80px] py-[20px]  text-text1 gap-4">

    <div class="my-auto">
      <button class="block md:hidden"
        @click="emit('toggle-chapter')"
      >
        <svg 
        class="w-8 h-8" 
        style="color: var(--icon-color)" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg">
          <path 
          transform="scale(1.3)" 
          d="M4 6H20M4 12H14M4 18H9" 
          stroke="currentColor" 
          stroke-width="3" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>


    <div>
      <button
        @click="router.push('/panel')"
        class="font-lexendExa text-center text-xl text-text1 hover:text-hoverText transition duration-300"
      >
      Inicio
      </button>
    </div>

    <div class="relative flex gap-2 mx-auto items-center">
      <input
        type="text"
        v-model="busqueda"
        class="w-[150px] md:w-[300px] md:h-[30px] text-center bg-transparent border-2 rounded-lg border-border1 focus:outline-none placeholder-placeholder"
        placeholder="Buscar libro"
      >
      <Resultados
        v-if="!esRutaLeer && busqueda.trim().length > 0"
        :resultados="librosFiltrados"
        :busqueda="busqueda"
        @select="irLibro"
      />

    </div>

    <button @click="toggleTheme" class="hidden md:block">
      <img class="theme-icon w-8 " alt="tema" />
    </button>

    <button class="ml-4 text-text hover:text-hoverText transition duration-300">
      <svg 
        class="w-8 h-8" 
        style="color:var(--icon-color)"
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg">
        <path 
        d="M4 6H20M4 12H20M4 18H20"
        transform="scale(1.3)" 
        stroke="currentColor" 
        stroke-width="3" 
        stroke-linecap="round" 
        stroke-linejoin="round"/>
      </svg>
    </button>

    
  </section>

  <!-- /leer → mostrar Libros -->
  <Libros
    v-if="esRutaLeer"
    :libros="librosFiltrados"
    @select="irLibro"
  /> 
   
</template>

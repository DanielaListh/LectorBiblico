<script setup>
  import { ref, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import Libros from '~/components/Libros'
  import Resultados from '~/components/Resultados'
  import { useTheme } from '~/composables/useTheme'
  import { mapaLibros } from '~/data/mapaLibros'

  const route = useRoute()
  const router = useRouter()

  const busqueda = ref('')

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
  <section class="flex h-[80px] py-[20px] px-[30px] text-text1">
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
        class="w-[300px] h-[30px] text-center bg-transparent border-2 rounded-lg border-border1 focus:outline-none placeholder-placeholder"
        placeholder="Buscar libro"
      >
      <Resultados
        v-if="!esRutaLeer && busqueda.trim().length > 0"
        :resultados="librosFiltrados"
        :busqueda="busqueda"
        @select="irLibro"
      />

    </div>

    <button @click="toggleTheme"
    >
      <img class="theme-icon w-8 " alt="tema" />
    </button>

    <button class="ml-4 text-text hover:text-hoverText transition duration-300">Menu</button>

    
  </section>

  <!-- /leer → mostrar Libros -->
  <Libros
    v-if="esRutaLeer"
    :libros="librosFiltrados"
    @select="irLibro"
  /> 
   
</template>

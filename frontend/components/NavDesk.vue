<script setup>
  import { ref, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import Libros from '~/components/Libros.vue'
  import Resultados from '~/components/Resultados.vue'
  import { libros } from '~/data/libros.js'
  import { useTheme } from '~/composables/useTheme'

  const route = useRoute()
  const router = useRouter()

  const busqueda = ref('')

  const normalizar = (t) =>
    t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

  const librosFiltrados = computed(() => {
    if (!busqueda.value) return libros
    return libros.filter(l =>
      normalizar(l).includes(normalizar(busqueda.value))
    )
  })

  const esRutaLeer = computed(() => route.path === '/leer')

  const irLibro = (libro) => {

    const convertirRomanos = (texto) => {
      return texto
        .replace(/^i\s/i, '1 ')
        .replace(/^ii\s/i, '2 ')
        .replace(/^iii\s/i, '3 ')
    }

    const slug = normalizar(convertirRomanos(libro))
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9]/g, "")
    router.push(`/leer/${slug}`)

  }


  const { toggleTheme } = useTheme() 
  
</script>

<template>
  <section class="flex h-[80px] py-[20px] px-[30px] text-text1 border-b border-border">
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
        class="w-[300px] h-[30px] text-center bg-transparent border-2 rounded-lg border-border focus:outline-none placeholder-placeholder"
        placeholder="Buscar libro"
      >
      <Resultados
        v-if="!esRutaLeer && busqueda.length > 0"
        :resultados="librosFiltrados"
        @select="irLibro"
      />

    </div>

    <button @click="toggleTheme"
    >
      <img class="theme-icon w-6 " alt="tema" />
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

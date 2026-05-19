<script setup>
  import { ref, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import Libros from '~/components/Libros.vue'
  import Resultados from '~/components/Resultados.vue'
  import { libros } from '~/data/libros.js'

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
</script>

<template>
  <section class="flex py-[20px] px-[30px]">
    <div class=" relative flex gap-2 mx-auto items-center">
      <input
        type="text"
        v-model="busqueda"
        class="w-[300px] h-[30px] text-center bg-transparent border-2 rounded-lg border-[#5b493b] focus:outline-none placeholder-[#958671]"
        placeholder="Buscar libro"
      >
      <Resultados
        v-if="!esRutaLeer && busqueda.length > 0"
        :resultados="librosFiltrados"
        @select="irLibro"
      />

    </div>

    <div class="relative flex flex-col font-lexendExa w-[140] px-2 h-auto border-2 text-[#5b493b] border-[#beb093] rounded-lg">
      <ul>
        <li >
          <a class="font-semibold text-xl hover:text-[#d29928]">Perfil</a>
          <!---
          <ul>
            <li class="font-normal hover:text-[#d29928]">Favoritos</li>
            <li class="hover:text-[#d29928]">Anotaciones</li>
          </ul>
        -->
        </li>
      </ul>  
    </div>
  </section>

  <!-- /leer → mostrar Libros -->
  <Libros
    v-if="esRutaLeer"
    :libros="librosFiltrados"
    @select="irLibro"
  /> 
   
</template>

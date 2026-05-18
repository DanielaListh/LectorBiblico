<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
//import { mapaLibros } from '~/utils/mapaLibros'

const route = useRoute()
const router = useRouter()

const libro = route.params.libro
const capitulo = route.params.capitulo

//const libroApi = mapaLibros[libroSlug] //

const data = ref(null) // aquí se guardará la información del capítulo cargado

onMounted(async () => {
  try {
    //const res = await fetch(`https://www.esvapi.com/api/bible/rvr1960/${libro}/${capitulo}`)
    const res = await fetch(`https://api.midvash.com/v1/rvr1960/${libro}/${capitulo}`)
    data.value = await res.json()
  } catch (e) {
    console.error("Error cargando capítulo:", e)
  }
})

const irACapitulo = (num) => {
  router.push(`/leer/${libro}/${num}`)
}

</script>

<template>
  <section class="w-full min-h-screen bg-[#f8f1e4] text-[#5b493b] px-10 py-12">

    <div>

      <!-- TÍTULO -->
      <h1 
        v-if="data.book"
        class="text-5xl font-bold font-lexendExa mb-2 capitalize"
      >
        {{ data.book }}
      </h1>
      <h1 v-else>
        Parece que no tienes acceso a internet
      </h1>

      <!-- SUBTÍTULO -->
      <h2 class="text-2xl font-semibold text-[#8a775f] mb-8">
        Capítulo {{ data.chapter }}
      </h2>

      <!-- CONTENIDO -->
      <div class="flex flex-col gap-6 leading-relaxed text-lg max-w-3xl">

        <div
          v-for="vers in data.verses"
          :key="vers.number"
          class="flex gap-3"
        >
          <span class="font-bold text-[#d2a85a]">
            {{ vers.number }}
          </span>

          <p class="text-[#5b493b]">
            {{ vers.text }}
          </p>
        </div>

      </div>

      <!-- NAVEGACIÓN -->
      <div class="flex justify-between mt-12 max-w-3xl">

        <button
          v-if="data.previous"
          @click="irACapitulo(data.previous)"
          class="px-6 py-3 rounded-xl border border-[#dcc16b] text-[#5b493b] hover:bg-[#dcc16b]/20 transition"
        >
          ← Capítulo anterior
        </button>

        <div></div>

        <button
          v-if="data.next"
          @click="irACapitulo(data.next)"
          class="px-6 py-3 rounded-xl border border-[#dcc16b] text-[#5b493b] hover:bg-[#dcc16b]/20 transition"
        >
          Siguiente capítulo →
        </button>

      </div>

    </div>

  </section>
</template>

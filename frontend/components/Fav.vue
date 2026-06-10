<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const irAFavorito = (item) => {
  router.push({
    path: `/panel/libros/${item.libro}/${item.capitulo}`,
    query: { vers: item.versiculos[0] } // si es un rango tomamos el primero
    
  })

}

// Array reactivo donde se cargarán los favoritos guardados
const favoritos = ref([])

onMounted(() => {
  const data = localStorage.getItem('resaltados')
  favoritos.value = data ? JSON.parse(data) : []
  ordenarFavoritos()
})

const eliminar = (id) => {
  favoritos.value = favoritos.value.filter(item => item.id !== id)
  ordenarFavoritos()
  localStorage.setItem("resaltados", JSON.stringify(favoritos.value))
}

const obtenerTextoFavorito = (item) => {
  const libro = item.libro
  const cap = item.capitulo
  const vers = item.versiculos

  return item.texto || "(texto no guardado)"
}

const ordenarFavoritos = () => {
  favoritos.value.sort((a, b) => {
    if (a.libro < b.libro) return -1
    if (a.libro > b.libro) return 1
    return a.capitulo - b.capitulo
  })
}

</script>


<template> 
  <section class="p-4 flex flex-col h-[500px] overflow-y-auto">
    <h2 class="text-[#5b493b] font-lexendExa flex  w-full text-4xl h-[50px] font-semibold my-2">Mis favoritos</h2>
    <!-- masonry-->
    <div class=" columns-3 gap-4 w-full">

      <div
        v-for="item in favoritos"
        :key="item.id"
        @click="irAFavorito(item)" 
        class="cursor-pointer break-inside-avoid bg-bg2 p-3 rounded-xl font-lexendExa mb-4"
      >
        <div
          
          class="flex justify-between items-center">
          <h3 class="font-semibold text-text1 font-lexendExa">
            {{ item.libro }} {{ item.capitulo }} :
            <span v-if="item.versiculos && item.versiculos.length === 1">
            {{ item.versiculos[0] }}
            </span> 
            <span v-else-if="item.versiculos && item.versiculos.length > 1"> ?
              [{{ item.versiculos[0] }} - {{ item.versiculos[item.versiculos.length - 1] }}]
            </span>
          </h3>
          <button
            @click="eliminar(item.id)" 
            class=""
          >
          <svg 
          class="w-5 h-5 text-text1" 
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          
          
              <path :style="{ fill: 'var(--icon-color)'}"  d="M465.423,48.241h-137.61V23.955C327.813,10.746,317.082,0,303.893,0h-95.785c-13.19,0-23.92,10.746-23.92,23.955V48.24
                H46.577c-6.655,0-12.049,5.394-12.049,12.049c0,6.655,5.394,12.049,12.049,12.049h22.332l15.228,396.396
                C85.069,492.995,104.818,512,129.099,512h253.804c24.281,0,44.03-19.006,44.96-43.267l15.228-396.396h22.332
                c6.653,0,12.049-5.394,12.049-12.049C477.472,53.635,472.078,48.241,465.423,48.241z M208.285,24.097h95.43v24.143h-95.43V24.097z
                M403.784,467.809c-0.433,11.268-9.605,20.094-20.882,20.094H129.099c-11.276,0-20.448-8.827-20.882-20.095L93.025,72.338h325.952
                L403.784,467.809z"/>
            
              <path :style="{ fill: 'var(--icon-color)'}" d="M182.63,181.571c-0.127-6.575-5.494-11.817-12.042-11.817c-0.078,0-0.158,0-0.236,0.002
                c-6.652,0.128-11.943,5.626-11.815,12.278l3.781,196.634c0.126,6.575,5.495,11.817,12.042,11.817c0.078,0,0.158,0,0.236-0.002
                c6.653-0.128,11.943-5.624,11.815-12.278L182.63,181.571z"/>
            
              <path :style="{ fill: 'var(--icon-color)'}" d="M255.998,169.753c-6.654,0-12.049,5.394-12.049,12.049v196.634c0,6.654,5.394,12.049,12.049,12.049
                c6.655,0,12.049-5.394,12.049-12.049V181.802C268.047,175.148,262.653,169.753,255.998,169.753z"/>
           
              <path :style="{ fill: 'var(--icon-color)'}" d="M341.645,169.756c-6.628-0.147-12.151,5.162-12.278,11.815l-3.781,196.634c-0.129,6.653,5.162,12.15,11.815,12.278
                c0.078,0.001,0.158,0.002,0.236,0.002c6.546,0,11.916-5.244,12.042-11.817l3.781-196.634
                C353.588,175.38,348.299,169.883,341.645,169.756z"/>
          
        </svg>
          </button>
        </div>
          <p class="text-text2 mt-2">
            {{ obtenerTextoFavorito(item) }}
          </p>
      </div>
      

    </div>
  </section>
</template>

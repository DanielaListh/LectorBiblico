<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted,watch } from 'vue'
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
const direccion = ref('next') //para animacion al cambiar de pag


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

watch(
  () => data.value,
  () => {
    const vers = route.query.vers
    if (vers) {
      scrollToVersiculo(vers)
    }
  }
)

const scrollToVersiculo = (vers) => {
  setTimeout(() => {
    const el = document.querySelector(`[data-vers="${vers}"]`)
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block:"center"
      })
    }
  }, 300)
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

//swipe

const touchStartX = ref(0)
const touchEndX = ref(0)
const swipeThreshold = 50 // distancia mínima para considerar un swipe

const nextChapterSwipe = () => {
  if (nextChapter.value) {
    direccion.value = 'next'
    irACapitulo(nextChapter.value)
  }
}

const prevChapterSwipe = () => {
  if (previousChapter.value) {
    direccion.value = 'prev'
    irACapitulo(previousChapter.value)
  }
}

//const nextChapterSwipe = () =>

const handleTouchStart = (e) => {
  touchStartX.value = e.changedTouches[0].clientX// obtenemos la posición inicial del toque en el eje X  
}

const handleTouchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].clientX // obtenemos la posicion final del toque

  const diff = touchStartX.value - touchEndX.value // nos da la diferencia entre la posición inicial y final del toque

  //detectamos seleccion de texto
  const selection = window.getSelection()
  const texto = selection.toString().trim()

  if (texto.length > 0) {
    handleSelection(texto) //se hay texto seleccionado se llama a la funcion
    return
  }

  if (diff > swipeThreshold) {
    nextChapterSwipe()
    return
  } 

  if (diff < -swipeThreshold) {
    prevChapterSwipe()
    return
  }

}

const handleKey = (e) => {
  console.log(e.key)
   if (e.key === 'ArrowRight') {
     nextChapterSwipe()
   }
   if (e.key === 'ArrowLeft') {
    prevChapterSwipe()
   }
}

onMounted(() => {
  window.addEventListener('keydown', handleKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKey)
})


//selector de textos por mouse
const handleMouseUp = () => {
  if (texto.length > 0) {
    handleSelection(texto)
  }
}

//funcion para manejar la seleccion de texto
const handleSelection = () => {
  const selection = window.getSelection()
  const texto = selection.toString().trim()

  if (!texto) return
  const versiculos = obtenerVersiculosSeleccionados()
  if(versiculos.length === 0) return
  abrirMenuResaltador(versiculos)
}

//menu florante
const menuResaltador = ref({
  visible: false,
  versiculos: [],
  x: 0,
  y:0
}) 



const resaltadoColores = [
  "transparent", // quitar subrayado
  "#d8c3a6",  //crema
  "#dcc16b",  //amarillo
  "#ca7f56", // naranje suave
  "#994d2c",  // rojo suave
  "#9baa5e", //verde
  "#54523a", // verde oscuro
  "#734f3a" //marron
]

//abrir el menu flotante
const abrirMenuResaltador = (versiculos) => {
  const selection = window.getSelection()
  if (!selection.rangeCount) return // 

  const rect = selection.getRangeAt(0).getBoundingClientRect()

  menuResaltador.value = {
    visible: true,
    versiculos,
    x: rect.left + window.scrollX,
    y:rect.top + window.scrollY - 50 // un poco arriba
  }
}

//cerrar menu
const cerrarMenuResaltador = () => {
  menuResaltador.value.visible = false
}


const seleccionarColor = (color) => {
  guardarResaltado(menuResaltador.value.versiculos, color)
  emitirResaltado()
  cerrarMenuResaltador()
}

//guardar en localDtorage los textos selccionados
const guardarResaltado = (versiculos, color) => {
  const libroActual = route.params.libro
  const capituloActual = Number(route.params.capitulo)

  const textoRango = versiculos.map(v => data.value.verses[v - 1]).join("")

  const nuevo = {
    id: crypto.randomUUID(),
    libro: libroActual,
    capitulo: capituloActual,
    versiculos,
    color,
    texto: textoRango,
    fecha:Date.now()
  }

  const almacenados = JSON.parse(localStorage.getItem("resaltados") || "[]")

  if (color === "transparent") {
    const filtrados = almacenados.filter(
      r => !(r.libro === libroActual &&
        r.capitulo === capituloActual &&
        JSON.stringify(r.versiculos) === JSON.stringify(versiculos))
  )
    localStorage.setItem("resaltados", JSON.stringify(filtrados))
    return
  }

  //guardar el nuevo highlight
  almacenados.push(nuevo)
  localStorage.setItem("resaltados", JSON.stringify(almacenados))
}

const resaltarVersiculo = (numVers, texto) => {
  const resaltados = JSON.parse(localStorage.getItem("resaltados") || "[]")

  const libroActual = route.params.libro
  const capituloActual = Number(route.params.capitulo)

  const delCapitulo = resaltados.filter(
    r => r.libro === libroActual && r.capitulo === capituloActual
  )

  const match = delCapitulo.find(resaltado => resaltado.versiculos.includes(numVers))
  
  if (!match) return texto

  return `<mark style="background:${match.color}; padding:2px; border-radius:4px;">${texto}</mark>` 
}

const obtenerVersiculosSeleccionados = () => {
  const selection = window.getSelection()
  if (!selection.rangeCount) return [] 

  const range = selection.getRangeAt(0)
  const versiculos = [...document.querySelectorAll(".versiculo")]

  //detecta que versiculos intersectan la seleccion
  const seleccionados = versiculos.filter(v => {
    const rect = v.getBoundingClientRect()
    const selRect = range.getBoundingClientRect()

    return !(
      rect.bottom < selRect.top ||
      rect.top > selRect.bottom
    )
  })

  return seleccionados.map(v => Number(v.dataset.vers))
}

//evento que se dispara cuando se crea un resaltado
const emitirResaltado = () => {
  window.dispatchEvent(new Event("resaltados-actualizados"))
}

onMounted(() => {
  window.addEventListener("resaltados-actualizados", refrescarResaltados)
})

onUnmounted(() => {
  window.removeEventListener("resaltados-actualizados", refrescarResaltados)
})

const refrescarResaltados = () => {
  data.value = { ...data.value} //fuerza el re renderizado
}

</script>

<template>
  <section 
    class="w-auto h-auto overflow-x-hidden md:h-screen md:overflow-y-auto md:w-full" 
    @touchstart="handleTouchStart" 
    @touchend="handleTouchEnd"
    @mouseup="handleSelection"
    
  >
  <!--Menu flotante-->
  <transition name="fade-scale">
    <div 
      v-if="menuResaltador.visible"
      class="fixed z-[600] bg-bg2 border border-border2 shadow-xl rounded-xl p-3 flex gap-2 items-center"
      :style="{top: menuResaltador.y + 'px', left: menuResaltador.x + 'px'}" 
    >
      <button
        v-for="color in resaltadoColores"
        :key="color"
        @click="seleccionarColor(color)"
        class="w-7 h-7 rounded-full"
        :style="{ background: color === 'transparent' ? 'white' : color }"
      >
        <span v-if="color === 'transparent'" class="text-text1 text-xs font-bold"></span>
      </button>
    </div>
  </transition>
  
    <!-- Contenedor de Nombre de Libro, Capitulo y botones de navegacion entre capitulos-->
    <div class="items-center px-5 py-4 sticky top-0 
          flex md:justify-between md:px-10 md:py-6 md:bg-main ">
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
          @click="
            direccion = 'prev';
            irACapitulo(previousChapter)">
          <img src="/img/flechaIzq.png" alt="Anterior"class="w-[30px]">
        </button>
        <button
          v-if="nextChapter" 
          @click="
            direccion = 'next';
            irACapitulo(nextChapter)">
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
      <div class="h-6 w-3/6 bg-bg4 rounded mb-4"></div>
      <div class="h-6 w-4/6 bg-bg4 rounded mb-4"></div>
      <div class="h-6 w-3/6 bg-bg4 rounded mb-4"></div>
      <div class="h-6 w-5/6 bg-bg4 rounded mb-4"></div>
      <div class="h-6 w-3/6 bg-bg4 rounded mb-4"></div>
      <div class="h-6 w-5/6 bg-bg4 rounded mb-4"></div>
      <div class="h-6 w-3/6 bg-bg4 rounded mb-4"></div>
    </div>
        
    <!-- contenedor de versiculos -->
    <Transition
      :name="direccion === 'next' ? 'slide-next' : 'slide-prev'"
      mode="out-in"
    >
      <div
        v-if="!cargando"
        :key="`${libro}-${capitulo}`"
        class="pl-5 flex flex-col gap-2 leading-relaxed text-lg md:max-w-4xl md:px-10 md:pt-3 md:pb-12"
      >
        <div
          v-for="(vers, index) in data?.verses || []"
          :key="index"
          class="versiculo flex gap-3"
          :data-vers="index + 1"
        >
          <span class="font-bold font-lexendExa text-text2">
            {{ index + 1 }}
          </span>

          <p 
            class="text-text1 font-lexendExa"
            v-html="resaltarVersiculo(index + 1, vers)"
            >
            
          </p>
        </div>
      </div>
    </Transition>

  </section>
</template>

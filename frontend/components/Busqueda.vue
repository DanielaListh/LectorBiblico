<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { mapaLibros } from '~/data/mapaLibros';
import { computed } from 'vue';

const router = useRouter();
const busqueda = ref('');

//listado de libros del antiguo testamento
const listAncientTestament = ["Génesis", "Éxodo", "Levítico", "Números", "Deuteronomio", "Josué",
    "Jueces", "Rut", "1 Samuel", "2 Samuel", "1 Reyes", "2 Reyes", "1 Crónicas", "2 Crónicas",
    "Esdras", "Nehemías", "Ester", "Job",
    "Salmos", "Proverbios", "Eclesiastés", "Cantares", "Isaías", "Jeremías", "Lamentaciones",
    "Ezequiel", "Daniel", "Oseas", "Joel", "Amós", "Abdías", "Jonás", "Miqueas", "Nahúm",
    "Habacuc", "Sofonías", "Hageo", "Zacarías","Malaquías",
]

//listado de libros del nuevo testamento
const listNewTestament = ["Mateo", "Marcos", "Lucas", "Juan", "Hechos", "Romanos", "1 Corintios", "2 Corintios",
    "Gálatas", "Efesios", "Filipenses", "Colosenses", "1 Tesalonicenses", "2 Tesalonicenses", "1 Timoteo",
    "2 Timoteo", "Tito", "Filemón", "Hebreos", "Santiago", "1 Pedro", "2 Pedro", "1 Juan", "2 Juan", "3 Juan", "Judas", "Apocalipsis"
]

const coincidenciaBusqueda = (libro) => {
    return busqueda.value && libro.toLowerCase().includes(busqueda.value.toLowerCase()); // Si busqueda.value es vacío, no se considera coincidencia
}

const mapaInverso = Object.fromEntries(
    Object.entries(mapaLibros).map(([slug, nombre]) => [nombre, slug])
    // Esto crea un nuevo objeto donde las claves son los nombres de los libros y los valores son los slugs
)

const irLibro = (libro) => {
    const slug = mapaInverso[libro]; // Obtener el slug del libro usando el mapa inverso
    router.push(`/panel/libros/${slug}/1`)
}

</script>

<template>

    <section id="busqueda" class="h-auto flex items-center justify-center flex-col gap-4 py-20">
        <div class="flex flex-col justify-center items-center text-center">
            <h2 class="font-cinzel text-3xl text-text1 md:text-5xl">ENCUENTRA EL LIBRO</h2>
            <h3 class="font-cinzel text-text1">DE LA BIBLIA QUE <span class=" text-text2">DESEAS LEER</span> HOY</h3>
        </div>
        

        <div class="hidden md:flex gap-2">
            <input 
                v-model="busqueda"
                type="text" 
                class="border-2 border-border1 bg-transparent rounded-lg  h-8 px-6 p-2 focus:outline-none focus:ring-2 focus:ring-[#d8b48a] text-text1"
                >
            <img src="/img/loupe.png" alt="lupa" class="w-auto h-[30px]">
        </div>

        <div class="w-full font-lexendExa md:w-[85%]">
            <h2 class="m-[30px] text-center text-2xl text-text2 md:text-3xl md:text-left">Antiguo testamento</h2>
            <div class="m-[30px]">
                <ul class=" flex flex-wrap gap-2 justify-center md:justify-normal md:items-normal">
                    <li 
                        v-for="libro in listAncientTestament" :key="libro"
                        class="text-sm sm:text-base px-2 py-1 border-2 w-auto p-1 text-text1 border-border1 hover:border-hoverBorder2 transition-colors duration-300 rounded-lg text-center "
                       :class="[
                            coincidenciaBusqueda(libro)
                            ? 'bg-bg4 text-text1 shadow-lg shadow-[#74522baf] scale-105 hover:bg-hoverBg'
                            : 'hover:text-hoverText hover:shadow-md hover:shadow-[#B56B46]/30'
                        ]"
                        >
                    <a
                     
                     @click="irLibro(libro)"
                    >
                    {{ libro }}
                    </a>
                    
                    </li>
                </ul>
            </div>
        </div>
        <div class="w-full font-lexendExa md:w-[85%]">
            <h2 class="m-[30px] text-center text-2xl text-text1 md:text-3xl md:text-left">Nuevo testamento</h2>
            <div class="m-[30px]">
                <ul class=" flex flex-wrap gap-2 justify-center md:justify-normal md:items-normal">
                    <li 
                        v-for="libro in listNewTestament" :key="libro"
                        class="text-sm sm:text-base px-2 py-1 border-2 w-auto p-1 text-text1 border-border1 hover:border-hoverBorder2 transition-colors duration-300 rounded-lg text-center "
                       :class="[
                            coincidenciaBusqueda(libro)
                            ? 'bg-bg4 text-text1 shadow-lg shadow-[#74522baf] scale-105 hover:bg-hoverBg'
                            : 'hover:text-hoverText hover:shadow-md hover:shadow-[#B56B46]/30'
                        ]"
                        >
                    <a
                        @click="irLibro(libro)"
                    >
                        {{ libro }}
                     </a>
                    
                    </li>
                </ul>
            </div>
        </div>
        

    </section>

</template>
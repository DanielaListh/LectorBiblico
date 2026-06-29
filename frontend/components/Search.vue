<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { booksMap } from '~/data/booksMap';

const router = useRouter();
const search = ref('');

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

const matchSearch = (book) => {
    return search.value && book.toLowerCase().includes(search.value.toLowerCase()); // Si busqueda.value es vacío, no se considera coincidencia
}

const reverseMap = Object.fromEntries(
    Object.entries(booksMap).map(([slug, name]) => [name, slug])
    // Esto crea un nuevo objeto donde las claves son los nombres de los libros y los valores son los slugs
)

const goToBook = (book) => {
    const slug = reverseMap[book]; // Get the book's slug using the inverse booksMap.
    router.push(`/panel/libros/${slug}/1`)
}

</script>

<template>

    <section id="search" class="h-auto flex items-center justify-center flex-col gap-4 py-5">
        <div class="flex flex-col justify-center items-center text-center">
            <h2 class="tittle-primary">Explora la Biblia</h2>
            <p class="paragraph">Busca un libro o explora el Antiguo y Nuevo Testamento.</p>
        </div>
        

        <div class="hidden md:flex gap-2">
            <input 
                v-model="search"
                type="text" 
                class="input"
            >
        </div>

        <div class="w-full font-lexendExa md:w-[85%]">
            <h2 class="m-[30px] text-center text-2xl text-text2 md:text-3xl md:text-left">Antiguo testamento</h2>
            <div class="m-[30px]">
                <ul class=" flex flex-wrap gap-2 justify-center md:justify-normal md:items-normal">
                    <li 
                        v-for="book in listAncientTestament" :key="book"
                        class=" "
                       :class="[
                            matchSearch(book)
                            ? 'bg-bg4 text-text1 shadow-lg shadow-[#74522baf] scale-105 hover:bg-hoverBg'
                            : 'hover:text-hoverText1 hover:shadow-md hover:shadow-[#B56B46]/30'
                        ]"
                        >
                        <button
                            class="text-sm sm:text-base px-2 py-1 border-2 w-auto p-1 text-text2 border-border1 hover:border-hoverBorder2 transition-colors duration-300 rounded-lg text-center"
                            @click="goToBook(book)"
                        >
                            {{ book }}
                        </button>
                    
                    </li>
                </ul>
            </div>
        </div>
        <div class="w-full font-lexendExa md:w-[85%]">
            <h2 class="m-[30px] text-center text-2xl text-text1 md:text-3xl md:text-left">Nuevo testamento</h2>
            <div class="m-[30px]">
                <ul class=" flex flex-wrap gap-2 justify-center md:justify-normal md:items-normal">
                    <li 
                        v-for="book in listNewTestament" :key="book"
                        class="text-sm sm:text-base px-2 py-1 border-2 w-auto p-1 text-text1 border-border1 hover:border-hoverBorder2 transition-colors duration-300 rounded-lg text-center "
                       :class="[
                            matchSearch(book)
                            ? 'bg-bg4 text-text1 shadow-lg shadow-[#74522baf] scale-105 hover:bg-hoverBg'
                            : 'hover:text-hoverText1 hover:shadow-md hover:shadow-[#B56B46]/30'
                        ]"
                        >
                    <a
                        @click="goToBook(book)"
                    >
                        {{ book }}
                     </a>
                    
                    </li>
                </ul>
            </div>
        </div>
        

    </section>

</template>
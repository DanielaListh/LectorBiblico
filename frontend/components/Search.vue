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

    <section 
        id="search" 
        class="h-auto flex items-center justify-center flex-col gap-4 py-5 max-w-[80%] mx-auto">
        <div class="flex flex-col justify-center items-center text-center">
            <h2 class="h2">Explora la Biblia</h2>
            <h4 class="h4">Busca un libro o explora el Antiguo y Nuevo Testamento</h4>
        </div>
        

        <div class="hidden md:flex gap-2 justify-center items-center">
            <input 
                v-model="search"
                type="text" 
                class="input"
            >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon-line"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            >
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
            </svg>

        </div>

        <div class="w-full font-lexendExa">
            <h3 class="h3">Antiguo testamento</h3>
            <div class="">
                <ul class=" flex flex-wrap gap-2 justify-center md:justify-normal md:items-normal">
                    <li 
                        v-for="book in listAncientTestament" :key="book"
                        class="button-secondary-hover"
                       :class="[
                            matchSearch(book)
                            ? 'button-secondary-focus'
                            : 'button-secondary'
                        ]"
                        >
                        <button
                            class=""
                            @click="goToBook(book)"
                        >
                            {{ book }}
                        </button>
                    
                    </li>
                </ul>
            </div>
        </div>
        <div class="w-full font-lexendExa">
            <h3 class="h3">Nuevo testamento</h3>
            <div class="">
                <ul class=" flex flex-wrap gap-2 justify-center md:justify-normal md:items-normal">
                    <li 
                        v-for="book in listNewTestament" :key="book"
                        class="button-secondary-hover"
                       :class="[
                            matchSearch(book)
                            ? 'button-secondary-focus'
                            : 'button-secondary'
                        ]"
                        >
                    <button
                        @click="goToBook(book)"
                    >
                        {{ book }}
                    </button>
                    
                    </li>
                </ul>
            </div>
        </div>
        

    </section>

</template>
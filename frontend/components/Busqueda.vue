<script setup>
import { ref } from 'vue'

const busqueda = ref('');

//listado de libros del antiguo testamento
const listAncientTestament = ["Génesis", "Éxodo", "Levítico", "Números", "Deuteronomio", "Josué",
    "Jueces", "Rut", "I Samuel", "II Samuel", "I Reyes", "II Reyes", "I Crónicas", "II Crónicas",
    "Esdras", "Nehemías", "Ester", "Job",
    "Salmos", "Proverbios", "Eclesiastés", "Cantares", "Isaías", "Jeremías", "Lamentaciones",
    "Ezequiel", "Daniel", "Oseas", "Joel", "Amós", "Abdías", "Jonás", "Miqueas", "Nahúm",
    "Habacuc", "Sofonías", "Hageo", "Zacarías","Malaquías",
]

//listado de libros del nuevo testamento
const listNewTestament = ["Mateo", "Marcos", "Lucas", "Juan", "Hechos", "Romanos", "I Corintios", "II Corintios",
    "Gálatas", "Efesios", "Filipenses", "Colosenses", "I Tesalonicenses", "II Tesalonicenses", "I Timoteo",
    "II Timoteo", "Tito", "Filemón", "Hebreos", "Santiago", "I Pedro", "II Pedro", "I Juan", "II Juan", "III Juan", "Judas", "Apocalipsis"
]

const coincidenciaBusqueda = (libro) => {
    return busqueda.value && libro.toLowerCase().includes(busqueda.value.toLowerCase()); // Si busqueda.value es vacío, no se considera coincidencia

}

</script>

<template>

    <section id="busqueda" class="h-auto flex items-center justify-center flex-col gap-4 py-20">
        <div class="flex flex-col justify-center items-center text-center">
            <h2 class="font-cinzel text-4xl text-[#5b493b] md:text-5xl">ENCUENTRA EL LIBRO</h2>
            <h3 class="font-cinzel">DE LA BIBLIA QUE <span class=" text-[#dbaf27]">DESEAS LEER</span> HOY</h3>
        </div>
        

        <div class="hidden md:flex gap-2">
            <input 
                v-model="busqueda"
                type="text" 
                class="border-2 border-[#958671] rounded-lg  h-8 px-6 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
            <img src="/img/loupe.png" alt="lupa" class="w-auto h-[30px]">
        </div>

        <div class="w-full font-lexendExa md:w-[85%]">
            <h2 class="m-[30px] text-center text-2xl text-[#dbaf27] md:text-3xl md:text-left">Antiguo testamento</h2>
            <div class="m-[30px]">
                <ul class=" flex flex-wrap gap-2 justify-center md:justify-normal md:items-normal">
                    <li 
                        v-for="libro in listAncientTestament" :key="libro"
                        class="text-sm sm:text-base px-2 py-1 border-2 w-auto p-1 text-[#5b493b] border-[#d8c3a6] hover:border-[#6A513F] transition-colors duration-300 rounded-lg text-center "
                       :class="[
                            coincidenciaBusqueda(libro)
                            ? 'bg-[#6A513F] text-[#F2EAE3] shadow-lg shadow-[#6A513F]/40 scale-105'
                            : 'hover:text-[#b83801] hover:shadow-md hover:shadow-[#B56B46]/30'
                        ]"
                        >
                    <a href="">{{ libro }}</a>
                    
                    </li>
                </ul>
            </div>
        </div>
        <div class="w-full font-lexendExa md:w-[85%]">
            <h2 class="m-[30px] text-center text-2xl text-[#994D2C] md:text-3xl md:text-left">Nuevo testamento</h2>
            <div class="m-[30px]">
                <ul class=" flex flex-wrap gap-2 justify-center md:justify-normal md:items-normal">
                    <li 
                        v-for="libro in listNewTestament" :key="libro"
                        class="text-sm sm:text-base px-2 py-1 border-2 w-auto p-1 text-[#5b493b] border-[#d8c3a6] hover:border-[#6A513F] transition-colors duration-300 rounded-lg text-center "
                       :class="[
                            coincidenciaBusqueda(libro)
                            ? 'bg-[#6A513F] text-[#F2EAE3] shadow-lg shadow-[#6A513F]/40 scale-105'
                            : 'hover:text-[#b83801] hover:shadow-md hover:shadow-[#B56B46]/30'
                        ]"
                        >
                    <a href="">{{ libro }}</a>
                    
                    </li>
                </ul>
            </div>
        </div>
        

    </section>

</template>
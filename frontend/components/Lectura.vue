<script setup>
import { ref } from 'vue'

const busqueda = ref('');



const libros = [
    "Génesis",
    "Éxodo", "Levítico", "Números", "Deuteronomio", "Josué",
    "Jueces", "Rut", "I Samuel", "II Samuel", "I Reyes",
    "II Reyes", "I Crónicas", "II Crónicas",
    "Esdras", "Nehemías", "Ester", "Job",
    "Salmos", "Proverbios", "Eclesiastés", "Cantares",
    "Isaías", "Jeremías", "Lamentaciones",
    "Ezequiel", "Daniel", "Oseas", "Joel", "Amós",
    "Abdías", "Jonás", "Miqueas", "Nahúm",
    "Habacuc", "Sofonías", "Hageo", "Zacarías", "Malaquías",
    "Mateo", "Marcos", "Lucas", "Juan", "Hechos", "Romanos",
    "I Corintios", "II Corintios",
    "Gálatas", "Efesios", "Filipenses", "Colosenses",
    "I Tesalonicenses", "II Tesalonicenses", "I Timoteo",
    "II Timoteo", "Tito", "Filemón", "Hebreos", "Santiago",
    "I Pedro", "II Pedro", "I Juan", "II Juan", "III Juan", "Judas",
    "Apocalipsis"    
]

const imagenesPorLibro = {
    "Génesis": "/img/libros/genesis.webp",
    "Éxodo": "/img/libros/exodo.webp",
    "Levítico": "/img/libros/levitico.webp",
}

const coincidenciaBusqueda = (libro) => {
    return busqueda.value && libro.toLowerCase().includes(busqueda.value.toLowerCase()); // Si busqueda.value es vacío, no se considera coincidencia
}

</script>

<template>
    <section class="flex py-[20px] px-[30px]" >
        <div class="flex gap-2 mx-auto items-center">
            <button @click="miFuncion">
                <img src="/img/flechaIzq.png" alt="anterior" class="w-[20px]">
            </button>
            <input
                type="text"
                v-model="busqueda"
                class="w-[300px] h-[30px] text-center bg-transparent border-2 rounded-lg border-[#5b493b] focus:outline-none place-content-center placeholder-[#958671]"
                placeholder="Buscar libro">
            <button @click="miFuncion">
                <img src="/img/flechaDer.png" alt="siguiente"  class="w-[20px]">
            </button>
        </div>
        <div class="flex flex-col">
            <button class="font-lexendExa font-semibold text-xl text-[#5b493b] hover:text-[#d29928]">Perfil</button>
        </div>
    </section>

    <div class="w-full h-[3px] bg-[#beb093] "></div>

    <section class="w-[1000px] h-screen flex flex-wrap justify-center gap-4 overflow-y-auto p-4">

        <button
            v-for="libro in libros"
            :key="libro"

            class="
            relative group overflow-hidden
            w-[230px] h-[150px]
            rounded-[28px]
            border border-[#dcc16b]/40 bg-transparent
            transition-all duration-500 ease-out
            hover:w-[260px]
            hover:-translate-y-1
            hover:shadow-[0_0_25px_rgba(220,193,107,0.3)]
            hover:border-[#dcc16b]
            "
        >

            <!-- IMAGEN -->
            <img
            v-if="imagenesPorLibro[libro]"
            :src="imagenesPorLibro[libro]"
            alt=""

            class="
            absolute inset-0
            w-full h-full
            object-cover opacity-0 scale-110
            transition-all duration-700
            group-hover:opacity-100 group-hover:scale-100
            "
            >

            <!-- OVERLAY -->
            <div
            class="
            absolute
            inset-0

            bg-gradient-to-t
            from-black/70
            via-black/20
            to-transparent

            opacity-0
            transition-all
            duration-700

            group-hover:opacity-100
            "
            ></div>

            <!-- HALO -->
            <div
            class="
            absolute inset-0 opacity-0
            group-hover:opacity-100
            transition-all
            duration-500
            bg-[#ffdc68]/20
            "
            ></div>

            <!-- TEXTO -->
            <div
            class=" relative z-10 h-full flex items-end justify-start p-5"
            >
                <p
                    class="
                    font-lexendExa
                    text-xl
                    text-[#5b493b]
                    transition-all
                    duration-500
                    group-hover:text-[#f8ead0]
                    group-hover:drop-shadow-[0_0_8px_rgba(255,220,120,0.6)]"
                >
                    {{ libro }}
                </p>
            </div>

        </button>

    </section>
    
</template>
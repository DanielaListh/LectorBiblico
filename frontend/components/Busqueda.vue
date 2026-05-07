<script setup>

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

</script>

<template>

    <section class="h-auto flex items-center justify-center flex-col gap-4 py-20">
        <h2 class="font-cinzel text-5xl text-[#5b493b]">ENCUENTRA EL LIBRO</h2>
        <h3 class="font-cinzel">DE LA BIBLIA QUE <span class=" text-yellow-600">DESEAS LEER</span> HOY</h3>

        <div class="flex gap-2">
            <input type="text" class="border-2 border-[#958671] rounded-lg  h-8 px-6 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <img src="/img/loupe.png" alt="lupa" class="w-auto h-[30px]">
        </div>

        <div class="w-[85%] font-lexendExa">
            <h2 class="m-[30px] text-left text-3xl text-[#dbaf27]">Antiguo testamento</h2>
            <div class="m-[30px]">
                <ul class=" flex flex-wrap gap-2">
                    <li 
                        v-for="ancientTestament in listAncientTestament" :key="ancientTestament"
                        class="border-2 w-auto p-1 border-[#b59f7e] hover:border-[#dbaf27] transition-colors duration-300 rounded-lg text-center "
                    >
                    <a href="">{{ ancientTestament }}</a>
                    
                    </li>
                </ul>
            </div>
        </div>
        <div class=" w-[85%] font-lexendExa justify-center items-center">
            <h2 class=" text-left text-3xl text-[#699400] m-[30px]">Nuevo testamento</h2>
            <div class="m-[30px]">
                <ul class=" flex flex-wrap gap-2">
                    <li v-for="newTestament in listNewTestament" :key="newTestament" 
                    class="border-2 w-auto p-1 border-[#b59f7e] hover:border-[#699400] transition-colors duration-300 rounded-lg text-center"
                    >
                    <a href="">{{ newTestament }}</a>
                    </li>
                    
                </ul>
            </div>
        </div>
        

    </section>

</template>
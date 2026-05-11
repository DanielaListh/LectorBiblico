<script setup>
const pasos = [
    {paso: "1.", descripcion:"Para comenzar a leer busca el nombre del libro en la barra superior de busqueda."},
    {paso:"2.", descripcion: "Elige el capitulo para comenzar."},
    {paso:"3.", descripcion:"Tambien puedes elegir el versículo que desees."},
    {paso:"4.", descripcion:"Comienza a disfrutar de el conocimiento de la palabra de Dios 🧡"}   
    ]
</script>

<template>
    <section class="w-[80%] ml-[20%] h-auto ">
        <div v-for="(step, index) in pasos" :key="index"
            class="justify-center flex items-center m-[20px]"
        >
            <h2 class="font-cinzel text-[#beb093]">{{ step.paso }}</h2>
            <p class="font-lexendExa text-[#beb093]">{{ step.descripcion }}</p>
        </div>
    </section>
    
</template>
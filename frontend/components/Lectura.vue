<script setup>
const pasos = [
    {paso: "1.", descripcion:"Para comenzar a leer busca el nombre del libro en la barra superior de busqueda."},
    {paso:"2.", descripcion: "Elige el capitulo para comenzar."},
    {paso:"3.", descripcion:"Tambien puedes elegir el versículo que desees."},
    {paso:"4.", descripcion:"Comienza a disfrutar de el conocimiento de la palabra de Dios."}   
    ]
</script>

<template>
    <section class="w-full h-auto">
        <div v-for="(step, index) in pasos" :key="index"
            class="flex justify-start items-center m-[20px]"
        >
            <h2 class="font-corinthia text-5xl text-[#beb093] transition-all duration-700 hover:drop-shadow-[0_0_16px_#ffc100]">{{ step.paso }}</h2>
            <p class="font-lexendExa text-[1.2rem] text-[#beb093] ml-4">{{ step.descripcion }}</p>
        </div>
        <img src="/img/heart.png" alt="heart" 
        class="flex relative bottom-[62px] left-[78%] 
            transition-all duration-700 hover:drop-shadow-[0_0_16px_#ffc100]"
            >
    </section>
    
</template>
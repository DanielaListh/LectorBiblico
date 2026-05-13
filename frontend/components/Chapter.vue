<script setup>
    const capitulos = [
        { numero: 1, nombre: "Capitulo 1" },
        { numero: 2, nombre: "Capitulo 2" },
        { numero: 3, nombre: "Capitulo 3" },
        { numero: 4, nombre: "Capitulo 4" },
        { numero: 5, nombre: "Capitulo 5" },
        { numero: 6, nombre: "Capitulo 6" },
        { numero: 7, nombre: "Capitulo 7" },
        { numero: 8, nombre: "Capitulo 8" },
        { numero: 9, nombre: "Capitulo 9" },
        { numero: 10, nombre: "Capitulo 10" },
    ];
</script>
<template>
    <section class="w-[260px] h-auto max-h-[200px] text-[#5b493b]">
        <div class="h-[3px] bg-[#beb093]"></div>
        <ul class="h-[178px] font-lexendExa text-[1.3rem] flex flex-col justify-start m-5 overflow-y-auto">
            <li v-for="capitulo in capitulos" :key="capitulo.numero" class="">
                <a href="" class="hover:text-[#d29928]">{{ capitulo.nombre }}</a>
            </li>
        </ul>
        
    </section>
</template>
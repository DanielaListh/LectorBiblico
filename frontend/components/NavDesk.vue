<script setup>

</script>
<template>
    <section class="flex py-[20px] px-[30px]" >
        <div class="flex gap-2 mx-auto items-center">
            <button @click="miFuncion">
                <img src="/img/flechaIzq.png" alt="ir al anterior capitulo" class="w-[20px]">
            </button>
            <input type="text" class="w-[300px] h-[30px] bg-transparent border-2 rounded-lg border-[#5b493b] focus:outline-none">
            <button @click="miFuncion">
                <img src="/img/flechaDer.png" alt="pasar al siguiente capitulo"  class="w-[20px]">
            </button>
        </div>
        <div class="flex flex-col">
            <button class="font-lexendExa font-semibold text-xl text-[#5b493b] hover:text-[#d29928]">Perfil</button>
        </div>
    </section>
</template>
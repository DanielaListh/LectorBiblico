<template>
    <div class="flex w-full h-screen bg-[url('/img/fondo.png')] bg-cover bg-center">
        <div class="w-[20%] flex flex-col">
            <Logo />
            <Chapter />
            <Reproductor />
        </div>

        <div class="w-[3px] bg-[#beb093]"></div>

        <div class="flex-1 flex flex-col">
            <NavDesk />

            <div class="w-full h-[3px] bg-[#beb093] "></div>

            <Lectura />
        </div>
        
    </div>
</template>
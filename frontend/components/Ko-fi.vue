<script setup>
const openBinance = () => {
    if (process.client) {
            window.open('https://www.binance.com/en/my/payment/send', '_blank');
        }
    }

</script>

<template>
    <section id="donar" class="w-[80%] h-screen m-[20px] mx-auto flex justify-between items-center gap-5 ">
        <div class="flex flex-col items-center text-center bg-[#f7f0e0] w-[400px] h-[200px] p-6 rounded-3xl  " >
            <h2 class="font-bellefair text-[#5b493b] text-3xl m-[5px]">Dóname un cafecito</h2>
            <p class="font-lexendExa text-[#dbaf27]">Tu apoyo me ayuda a seguir desarrollando nuevas funciones y 
                mantener la web limpia, simple y sin publicidad. 
                
                Si quieres, puedes invitarme un cafecito.</p>
            <button
                @click="openBinance"
                class="bg-[#c5ae80] w-[140px] m-[10px] p-[10px] font-lexendExa rounded-2xl text-[#faf6f3]
                hover:bg-[#b09a6d] transition-colors duration-500"
            >
                Donar
            </button>
        </div>
        <div>
            <img src="/img/Daniel.png" alt="El profeta Daniel en el foso de los leones"
                class="hidden w-[600px] h-auto md:block">
        </div>
    </section>
</template>
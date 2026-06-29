<script setup>
const openBinance = () => {
  if (process.client) {
    window.open(
      "https://www.binance.com/en/my/payment/send",
      "_blank"
    );
  }
};
</script>

<template>

<section id="donate" class="my-[100px]">

    <!-- Imagen + halo -->
    <div class="flex items-center w-[80%] mx-auto my-10 md:h-[150px] lg:h-[200px] overflow-hidden justify-center">

        <div class="w-16 bg-bg2 h-[3px]"></div>
        <img
            src="/img/david.png"
            alt="Daniel"
            class="w-full h-full object-cover"
        />
        <div class="w-16 bg-bg2 h-[3px]"></div>
    </div>

    <div class="border-b-4 border-t-4 border-border2 rounded-2xl p-10 text-center w-[60%] mx-auto">

        <h2 class="tittle-secondary">
            Este proyecto existe gracias a personas como tú
        </h2>

        <p class="paragraph">
            La Santa Biblia Digital nació con un propósito: <span class="text-text2"> acercar la Palabra de Dios
            a cualquier persona,</span> sin anuncios, sin registros y completamente gratis. 
            Si este proyecto ha sido de bendición para ti, <span class="text-text2"> puedes ayudarme a seguir desarrollándolo para que continúe creciendo.</span> 
        </p>

        <button
            @click="openBinance"
            class="button-primary">
            <svg class="w-11 h-11 float-left -mt-3" viewBox="-7 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path :style="{fill:'var(--icon-color)'}" d="M14 16.6c-0.2 0-0.4 0-0.56 0.040v-1.32c0-0.48-0.36-0.84-0.84-0.84h-11.8c-0.48 0-0.84 
                0.36-0.84 0.84v4.2c0 3.72 3 6.72 6.72 6.72 2.080 0 3.92-0.96 5.16-2.44 0.64 0.4 1.36 0.64 2.12 
                0.64 2.16 0 3.92-1.76 3.92-3.92 0.040-2.16-1.68-3.92-3.88-3.92zM6.68 24.6c-2.8 
                0-5.040-2.28-5.040-5.040v-3.36h10.12v3.36c-0.040 2.76-2.28 5.040-5.080 5.040zM14 
                22.8c-0.44 0-0.88-0.12-1.24-0.36 0.4-0.88 0.64-1.84 0.64-2.88v-1.2c0.2-0.040 0.36-0.080 
                0.56-0.080 1.24 0 2.24 1 2.24 2.24 0.040 1.28-0.92 2.28-2.2 2.28zM6.040 10.88c-0.28 0.36-0.2 
                0.88 0.16 1.16 0.16 0.12 0.32 0.16 0.48 0.16 0.24 0 0.52-0.12 0.68-0.32 1.12-1.52 0.44-2.68 
                0-3.36-0.4-0.64-0.52-0.84-0.040-1.4 0.28-0.36 0.24-0.88-0.12-1.16s-0.88-0.24-1.16 0.12c-1.2 
                1.52-0.52 2.64-0.080 3.36 0.36 0.56 0.52 0.8 0.080 1.44z"></path>
            </svg>
            Invítame un cafecito
        </button>

        <p class="text-tiny">
            Cada aporte me ayuda a mejorar este espacio digital.
        </p>

        </div>

</section>


</template>
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
                <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon-line float-left -mt-2 mr-1"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                >
                    <path d="M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1" />
                    <path d="M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
                    <path d="M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
                    <path d="M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5z" />
                    <path d="M16.746 16.726a3 3 0 1 0 .252 -5.555" />
                </svg>
            Invítame un cafecito
        </button>

        <p class="text-tiny">
            Cada aporte me ayuda a mejorar este espacio digital.
        </p>

        </div>

</section>


</template>
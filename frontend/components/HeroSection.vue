<script setup>

const title = "La Biblia en un solo lugar";

const description =
  "Subraya versículos con diferentes colores, guarda tus favoritos, escucha música mientras lees y continúa exactamente donde te quedaste.";

const features = [
  {
    label: "Sin registro",
    icon:`<svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon-badge"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" />
            <path d="M19 19m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M17 21l4 -4" />
          </svg>`
  },
  {
    label: "Lectura continua en dispositivos",
    icon:`<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="icon-line"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z" />
            <path d="M11 4h2" />
            <path d="M12 17v.01" />
          </svg>`
  },
  {
    label: "Sin anuncios",
    icon:`<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="icon-badge"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4.91 4.949a9.968 9.968 0 0 0 -2.91 7.051c0 5.523 4.477 10 10 10a9.968 9.968 0 0 0 7.05 -2.909" />
            <path d="M20.778 16.793a9.955 9.955 0 0 0 1.222 -4.793c0 -5.523 -4.477 -10 -10 -10c-1.74 0 -3.376 .444 -4.8 1.225" />
            <path d="M7 15v-4.5a1.5 1.5 0 0 1 2.138 -1.358" />
            <path d="M9.854 9.853c.094 .196 .146 .415 .146 .647v4.5" />
            <path d="M7 13h3" />
            <path d="M14 14v1h1" />
            <path d="M17 13v-2a2 2 0 0 0 -2 -2h-1v1" />
            <path d="M3 3l18 18" />
          </svg>`
  },
  {
    label: "Playlist de Spotify",
    icon:`<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="icon-badge"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M8 11.973c2.5 -1.473 5.5 -.973 7.5 .527" />
            <path d="M9 15c1.5 -1 4 -1 5 .5" />
            <path d="M7 9c2 -1 6 -2 10 .5" />
          </svg>`
  },
  {
    label: "Favoritos ",
    icon:`<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="icon-badge"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
          </svg>`
  },
  {
    label: "Resaltado de versículos",
    icon:`<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="icon-badge"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 19h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
            <path d="M12.5 5.5l4 4" />
            <path d="M4.5 13.5l4 4" />
            <path d="M21 15v4h-8l4 -4z" />
          </svg>`
  },
  {
    label: "Anotaciones",
    icon:`<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="icon-badge"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M13 20l7 -7" />
            <path d="M13 20v-6a1 1 0 0 1 1 -1h6v-7a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7" />
          </svg>`
  },
  {
    label: "Diseño minimalista",
    icon:`<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="icon-badge"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 12a9 9 0 1 0 -8.012 8.946" />
            <path d="M9 10h.01" />
            <path d="M15 10h.01" />
            <path d="M9.5 15a3.59 3.59 0 0 0 2.774 .99" />
            <path d="M18.994 21.5l2.518 -2.58a1.74 1.74 0 0 0 .004 -2.413a1.627 1.627 0 0 0 -2.346 -.005l-.168 .172l-.168 -.172a1.627 1.627 0 0 0 -2.346 -.004a1.74 1.74 0 0 0 -.004 2.412l2.51 2.59z" />
          </svg>`
  },
];
</script>

<template>
  <section id="home"
    class="w-[80%] justify-center block mx-auto py-5"
  >
    <div class="w-full flex flex-col items-center text-center mx-auto">
      <h1 class="h1" >
        {{ title }}
      </h1>
      <h4 class="h4">
        {{ description }}
      </h4>

      <div class=" flex flex-col sm:flex-row gap-4 mt-3">
        <NuxtLink to="/panel">
          <button
            class="button-primary"
          >
            Comenzar a leer
          </button>
        </NuxtLink>
      </div>

      <!-- badges -->
      <div
        class="my-2 flex flex-wrap justify-center gap-2 md:max-w-[80%]"
      >
        <span
          v-for="item in features"
          :key="item.label"
          class="badges"
        >
          <span v-html="item.icon" class="hidden md:block mr-2"></span>
          {{ item.label }}
        </span>
      </div>
    </div>

    <div class="flex items-center justify-center w-full md:h-[150px] lg:h-[200px] overflow-hidden mx-auto mt-5">
      <div class="w-16 bg-bg4 h-[3px]"></div>
      <img src="/img/pastor2.png" alt="El buen pastor" class="w-full h-full object-cover">
      <div class="w-16 bg-bg4 h-[3px]"></div>
    </div>

  </section>

</template>

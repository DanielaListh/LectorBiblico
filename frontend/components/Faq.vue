<script setup>
import { ref } from "vue";

const openQuestion = ref(null);

const toggleQuestion = (index) => {
  openQuestion.value = openQuestion.value === index ? null : index;
};

const questions = [
  {
    title: "¿Cómo encontrar un versículo o libro específico?",
    description:
      "Puedes usar el buscador en la parte superior de la página para ingresar el nombre del libro. A medida que escribes, el sistema te mostrará sugerencias para encontrar rápidamente el pasaje que buscas."
  },
  {
    title: "¿Por qué leer la Biblia online?",
    description:
      "Leer la Biblia online te permite acceder a la Palabra de Dios desde cualquier lugar. Además, puedes buscar versículos, guardar favoritos, resaltar textos y personalizar tu experiencia."
  },
  {
    title: "¿Necesito registrarme para usar la plataforma?",
    description:
      "No. Puedes leer la Biblia, guardar favoritos, notas y resaltados sin crear una cuenta."
  },
  {
    title: "¿Puedo compartir versículos?",
    description:
      "Sí. Puedes copiar el versículo o compartirlo fácilmente con tus amigos mediante las opciones disponibles."
  },
  {
    title: "¿De dónde proviene el contenido bíblico?",
    description:
      "El texto bíblico proviene de Midvash API, utilizando la versión Reina-Valera 1960 de forma gratuita."
  },
  {
    title: "¿Funciona en dispositivos móviles?",
    description:
      "Sí. El lector es completamente responsivo y funciona perfectamente en computadoras, tablets y celulares."
  }
];
</script>

<template>
  <section
    id="faq"
    class="py-24 px-6 bg-bg5 mx-auto"
  >

    <div class="max-w-4xl mx-auto">

      <!-- título -->

      <h2
        class="tittle-secondary"
      >
        Preguntas Frecuentes
      </h2>

      <p class="paragraph">
        Resolvemos las dudas más comunes para que disfrutes de una mejor experiencia leyendo la Biblia
      </p>

      <!-- preguntas -->

      <div class="mt-10 max-w-4xl mx-auto space-y-4">

        <div
          v-for="(question, index) in questions"
          :key="index"
          class="overflow-hidden rounded-2xl border transition-all duration-300 ease-out"
          :class="[
            openQuestion === index
              ? 'border-border1'
              : 'border-border2 bg-transparent'
          ]"
        >

          <!-- Header -->

          <button
            @click="toggleQuestion(index)"
            class="group flex w-full items-center justify-between px-7 py-2 transition-all duration-300"
            :class="openQuestion === index ? '-translate-y-[1px]' : ''"
          >

            <h3
              class="subtittle"
              :class="
                openQuestion === index
                  ? 'text-text2'
                  : 'text-text1 group-hover:text-text2'
              "
            >
              {{ question.title }}
            </h3>

            <!-- Icono -->

            <div
              class="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
              :class="
                openQuestion === index
                  ? ' rotate-45'
                  : ''
              "
            >

              <svg
                class="h-6 w-6 transition-all duration-300"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  :style="{ fill: 'var(--icon-color)' }"
                  d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"
                />
              </svg>

            </div>

          </button>

          <!-- Contenido -->

          <Transition
            enter-active-class="transition-all duration-1000 ease-out"
            leave-active-class="transition-all duration-500 ease-in"

            enter-from-class="
            opacity-0
            -translate-y-2
            scale-[0.98]
            max-h-0
            "

            enter-to-class="
            opacity-100
            translate-y-0
            scale-100
            max-h-96
            "

            leave-from-class="
            opacity-100
            translate-y-0
            scale-100
            max-h-96
            "

            leave-to-class="
            opacity-0
            -translate-y-2
            scale-[0.98]
            max-h-0
            "
          >

            <div
              v-if="openQuestion === index"
              class="overflow-hidden"
            >

              <div class="flex">

                <!-- Barra lateral -->

                <div
                  class="ml-7 mr-6 mb-2 w-1 h-auto rounded-full bg-bg1"
                ></div>

                <!-- Texto -->

                <div
                  class="paragraph"
                >
                  {{ question.description }}
                </div>

              </div>

            </div>

          </Transition>

        </div>

      </div>

    </div>

  </section>
</template>
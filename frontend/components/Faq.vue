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
        class="font-cinzel text-4xl md:text-5xl text-center text-text1 font-bold"
      >
        Preguntas Frecuentes
      </h2>

      <p
        class="mt-5 text-center text-text2 font-lexendExa max-w-2xl mx-auto"
      >
        Resolvemos las dudas más comunes para que disfrutes de una mejor
        experiencia leyendo la Biblia.
      </p>

      <!-- preguntas -->

      <div class="mt-8 space-y-2">

        <div
          v-for="(question,index) in questions"
          :key="index"
          class="rounded-lg border-2 border-border1 transition-all duration-300 hover:shadow-xl overflow-hidden"
        >

          <!-- cabecera -->

          <button
            @click="toggleQuestion(index)"
            class="w-full flex justify-between items-center px-7 py-5 text-left"
          >

            <h3
              class="font-semibold text-lg text-text1"
            >
              {{ question.title }}
            </h3>

            <div
              class="text-3xl text-text1 font-light transition-transform duration-300"
              :class="openQuestion === index ? 'rotate-180' : ''"
            >
              {{ openQuestion === index ? "−" : "+" }}
            </div>

          </button>

          <!-- respuesta -->

          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            leave-active-class="transition-all duration-200 ease-in"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-96 opacity-100"
            leave-from-class="max-h-96 opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >

            <div
              v-if="openQuestion === index"
              class="border-l-4 border-[#e78c65] px-7 pb-6 text-text2 font-lexendExa leading-8"
            >
              {{ question.description }}
            </div>

          </Transition>

        </div>

      </div>

    </div>

  </section>
</template>
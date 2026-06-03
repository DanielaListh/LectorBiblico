<script setup>
const preguntas = [
    { title: "¿Cómo encontrar un versículo o libro específico? ", description: "Puedes usar el buscador en la parte superior de la página para ingresar el nombre del libro. A medida que escribes, el sistema te va mostrando sugerencias para que encuentres rápidamente el pasaje que estás buscando." },
    { title: "¿Por qué leer la Biblia online?", description: "Leer la Biblia online permite acceder a la Palabra de Dios desde cualquier lugar y en cualquier momento, sin necesidad de tener una copia física. Además, las plataformas digitales ofrecen herramientas interactivas como búsqueda por versículo, notas personales y textos resaltados, que enriquecen la experiencia de lectura y estudio "},
    { title: "¿Necesito registrarme para usar la plataforma?", description: "No es necesario, puedes leer la Biblia, guardar notas, textos resaltados o personalizar tu experiencia sin necesidad de registro" },
    { title: "¿Puedo compartir versículos con amigos?", description: "Sí, cada versículo tiene una opción para compartir por redes sociales o copiar el enlace. Las notas personales son privadas, pero podés copiarlas y compartirlas manualmente." },
    { title: "¿De dónde proviene el contenido bíblico?", description: "El texto bíblico se obtiene de Midvash API (https://api.midvash.com/), una fuente confiable que ofrece de manera gratuita y libre la versión Reina-Valera 1960 (RVR1960). Esta API proporciona los capítulos y versículos completos directamente desde su servidor, asegurando precisión y consistencia en cada lectura." },
    { title: "¿La plataforma funciona en dispositivos móviles?", description: "Sí, el sitio está diseñado para ser completamente responsivo y puede usarse desde celulares, tablets o computadoras sin perder calidad ni funcionalidad. La interfaz se adapta automáticamente al tamaño de la pantalla para que puedas leer, buscar y navegar de forma cómoda desde cualquier dispositivo."},
    
]
</script>

<template>
    <section 
        id="faq" 
        class="h-auto mx-auto flex flex-col items-center py-20"
    >
       <h2 class="font-cinzel text-center text-text1 m-[10px] text-4xl md:text-5xl">Preguntas Frecuentes</h2> 
       <div 
        class=" group h-auto mx-auto m-[10px] md:gap-1 md:space-y-3 md:h-screen md:w-[90%] 
                md:bg-[url('/img/moises1.png')] md:bg-cover md:bg-center lg:columns-3"
       >
            <div v-for="(pregunta, index) in preguntas" :key="index"
                class=" flex flex-col bg-bg3 text-text1 md:bg-bg3 border m-[20px]
                    border-border2 md:text-text1 rounded-2xl shadow-md
                    hover:border-hoverBorder1 transition-all duration-500 ease-out p-2
                    transform hover:translate-y-2 hover:shadow-2xl hover:shadow-[#754a1a]
                    break-inside-avoid">
                <h3 class="font-cinzel text-xl mb-2">{{ pregunta.title }}</h3>
                <p class="font-lexendExa text-sm">{{ pregunta.description }}</p>
            </div>
       </div>    
    </section>
</template>
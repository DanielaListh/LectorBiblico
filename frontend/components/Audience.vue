<template>
  <section id="audience" class="w-[90%] mx-auto px-16 py-10 overflow-hidden">
    <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

      <!-- Texto -->
      <div>
        <h2 class="tittle-secondary-left">
          Hecha para quienes buscan esperanza.
        </h2>

        <p class="paragraph">
          La Santa Biblia Digital fue creada para acompañarte cada día en tu caminar con Dios. Un lugar donde puedes leer, estudiar y guardar la Palabra de una forma sencilla y sin distracciones.
        </p>

        <!-- Beneficios -->
        <div class="mt-6 space-y-4">
          <!-- Item 1 -->
          <div class="flex gap-4">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
              <!-- Icono 1 -->
              <svg class="w-8 h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path 
                        :style="{ fill: 'var(--icon-color)'}"
                        d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 
                        6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 
                        12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM7.00061 
                        16.4209C6.68078 16.1577 6.20813 16.2036 5.94491 16.5234C5.68169 16.8432 5.72758 17.3159 
                        6.04741 17.5791L7.00061 16.4209ZM2.34199 13.4115C2.54074 13.7749 2.99647 13.9084 3.35988 
                        13.7096C3.7233 13.5108 3.85677 13.0551 3.65801 12.6917L2.34199 13.4115ZM2.75 9.1371C2.75 
                        6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 
                        6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 
                        1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 
                        20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 
                        19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 
                        19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 
                        22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 
                        17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 
                        3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 
                        3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 
                        9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 
                        19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 
                        20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219ZM9.42605 18.3219C8.63014 17.6945 
                        7.82129 17.0963 7.00061 16.4209L6.04741 17.5791C6.87768 18.2624 7.75472 18.9144 8.49742 
                        19.4999L9.42605 18.3219ZM3.65801 12.6917C3.0968 11.6656 2.75 10.5033 2.75 9.1371H1.25C1.25 
                        10.7746 1.66995 12.1827 2.34199 13.4115L3.65801 12.6917Z"/>
              </svg>
            </div>
            <div>
              <h3 class="subtittle">Encuentra paz</h3>
              <p class="paragraph">La Palabra de Dios puede acompañarte en los momentos difíciles y darte esperanza.</p>
            </div>
          </div>

          <!-- Item 2 -->
          <div class="flex gap-4">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
              <!-- Icono libro -->
              <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <!-- Contorno del libro -->
                <path
                    :style="{ stroke: 'var(--icon-color)' }"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z"
                />

                <!-- Línea superior -->
                <line
                    x1="8" y1="8" x2="16" y2="8"
                    :style="{ stroke: 'var(--icon-color)' }"
                    stroke-width="1.5"
                    stroke-linecap="round"
                />

                <!-- Línea media -->
                <line
                    x1="8" y1="12" x2="13" y2="12"
                    :style="{ stroke: 'var(--icon-color)' }"
                    stroke-width="1.5"
                    stroke-linecap="round"
                />

                <!-- Línea inferior curva (detalle elegante) -->
                <path
                    d="M8 16h6c1 0 2 .5 2 1.5"
                    :style="{ stroke: 'var(--icon-color)' }"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                </svg>

            </div>
            <div>
              <h3 class="subtittle">Aprende cada día</h3>
              <p class="paragraph">Lee la Biblia de forma sencilla, resalta versículos y guarda tus favoritos.</p>
            </div>
          </div>

          <!-- Item 3 -->
          <div class="flex gap-4">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
              <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path :style="{ stroke: 'var(--icon-color)' }" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M18 11V5C18 3.9 17.1 3 16 3H8C6.9 3 6 3.9 6 5V7M18 16V19C18 20.1 17.1 21 16 21H8C6.9 21 6 20.1 6 19V11M12 18V18.01" />
              </svg>
            </div>
            <div>
              <h3 class="subtittle">Disponible donde estés</h3>
              <p class="paragraph">Funciona desde computadora, tablet y celular sin necesidad de registrarte.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Imagen con blur detrás -->
        <div class="relative flex justify-center items-center">
            <!-- Halo detrás -->
            <div class="absolute w-[420px] h-[420px] bg-[#f0be6d] rounded-full blur-2xl opacity-70"></div>

            <!-- Card -->
            <div class="relative bg-bg2 backdrop-blur-md rounded-2xl p-6 w-[90%] md:w-[360px]">
                <img
                    src="/img/roca2.png"
                    alt="La tumba vacía de Jesucristo"
                    class="w-[340px] mx-auto rounded-lg"
                />

                <!-- Versículo -->
                <div class="flex items-center gap-2 mb-3 mt-4">
                    <i class="bx bxs-quote-alt-left text-3xl text-text4"></i>
                    <span class="font-semibold text-text1">Marcos 16:6</span>
                </div>

                

                <p class="italic text-text1 leading-6">
                    <span>
                        <svg class="w-5 h-5 float-left mr-[2px] mt-1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path 
                                :style="{ fill: 'var(--icon-color)' }"
                                d="M9.563 8.469l-0.813-1.25c-5.625 3.781-8.75 8.375-8.75 12.156 0 3.656 
                                2.688 5.375 4.969 5.375 2.875 0 4.906-2.438 4.906-5 
                                0-2.156-1.375-4-3.219-4.688-0.531-0.188-1.031-0.344-1.031-1.25 0-1.156 0.844-2.875 
                                3.938-5.344zM21.969 8.469l-0.813-1.25c-5.563 3.781-8.75 8.375-8.75 12.156 0 3.656 2.75 
                                5.375 5.031 5.375 2.906 0 4.969-2.438 4.969-5 0-2.156-1.406-4-3.313-4.688-0.531-0.188-1-0.344-1-1.25 
                                0-1.156 0.875-2.875 3.875-5.344z"></path>
                        </svg>
                    </span>
                    Mas él les dijo: No os asustéis; buscáis a Jesús nazareno, el que fue crucificado;
                    <span class="text-text2 font-semibold"> ha resucitado</span>,
                    no está aquí; mirad el lugar en donde le pusieron.
                    <span>
                        <svg class="w-5 h-5 float-rigth ml-32 -mt-6" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path
                                :style="{ fill: 'var(--icon-color)' }"
                                transform="scale(-1,1) translate(-32,0)"
                                d="M9.563 8.469l-0.813-1.25c-5.625 3.781-8.75 8.375-8.75 12.156 0 3.656 
                                2.688 5.375 4.969 5.375 2.875 0 4.906-2.438 4.906-5 
                                0-2.156-1.375-4-3.219-4.688-0.531-0.188-1.031-0.344-1.031-1.25 
                                0-1.156 0.844-2.875 3.938-5.344zM21.969 8.469l-0.813-1.25c-5.563 
                                3.781-8.75 8.375-8.75 12.156 0 3.656 2.75 5.375 5.031 5.375 
                                2.906 0 4.969-2.438 4.969-5 0-2.156-1.406-4-3.313-4.688-0.531-0.188-1-0.344-1-1.25 
                                0-1.156 0.875-2.875 3.875-5.344z"
                            />
                        </svg>
                    </span>
                </p>
            </div>
        </div>
    </div>
  </section>
</template>

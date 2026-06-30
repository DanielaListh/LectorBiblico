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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon-line"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8d6e63"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M14.017 18l-2.017 2l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 0 1 8.153 5.784" />
                <path d="M15.99 20l4.197 -4.223a2.81 2.81 0 0 0 0 -3.948a2.747 2.747 0 0 0 -3.91 -.007l-.28 
                .282l-.279 -.283a2.747 2.747 0 0 0 -3.91 -.007a2.81 2.81 0 0 0 -.007 3.948l4.182 4.238z" />
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon-line"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M12.088 4.82a10 10 0 0 1 9.412 .314a1 1 0 0 1 .493 .748l.007 .118v13a1 1 0 0 1 -1.5 
                .866a8 8 0 0 0 -8 0a1 1 0 0 1 -1 0a8 8 0 0 0 -7.733 -.148l-.327 .18l-.103 .044l-.049 .016l-.11 
                .026l-.061 .01l-.117 .006h-.042l-.11 -.012l-.077 -.014l-.108 -.032l-.126 -.056l-.095 -.056l-.089 
                -.067l-.06 -.056l-.073 -.082l-.064 -.089l-.022 -.036l-.032 -.06l-.044 -.103l-.016 -.049l-.026 -.11l-.01 
                -.061l-.004 -.049l-.002 -.068v-13a1 1 0 0 1 .5 -.866a10 10 0 0 1 9.412 -.314l.088 .044l.088 -.044z" />
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon-line"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8d6e63"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M11.5 21h-3.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v6" />
                <path d="M11 4h2" />
                <path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z" />
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

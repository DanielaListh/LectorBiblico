<script setup>
import { ref, onMounted } from 'vue'

// Array reactivo donde se cargarán los favoritos guardados
const favoritos = ref([])

onMounted(() => {
  const data = localStorage.getItem('favoritos')

  if (data) {
    try {
      const parsed = JSON.parse(data)

      // Validamos que cada item tenga title y versiculo
      favoritos.value = Array.isArray(parsed)
        ? parsed.filter(item => item.title && item.versiculo)
        : []

    } catch (e) {
      console.error("Error al leer favoritos:", e)
      favoritos.value = []
    }
  }
})
</script>


<template> 
  <section class="p-4 flex flex-col h-[500px] overflow-y-auto">
    <h2 class="text-[#5b493b] font-lexendExa flex  w-full text-4xl h-[50px] font-semibold my-2">Mis favoritos</h2>
    <!-- masonry-->
    <div class=" columns-3 gap-4 w-full">

      <div
        v-for="(item, index) in favoritos"
        :key="index"
        class="break-inside-avoid bg-white p-3 rounded-xl font-lexendExa mb-4"
      >
        <div class="flex justify-between items-center">
          <h3 class="font-semibold text-[#5b493b] font-lexendExa">{{ item.title }}</h3>
          <button class="text-xl hover:text-[#eb9d36]">...</button>
        </div>
        <p class="text-[#5b493b] font-lexendExa">{{ item.versiculo }}</p>
      </div>

    </div>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const libro = route.params.libro
</script>

<template>
  <div class="p-10 text-[#5b493b]">
    <h1 class="text-3xl font-bold capitalize">
      {{ libro }} — Selecciona un capítulo
    </h1>
  </div>
</template>


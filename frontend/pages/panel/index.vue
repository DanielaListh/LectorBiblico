<script setup>
import { libros } from '~/data/libros'

definePageMeta({
  layout: 'panel'
})


const props = defineProps({
  libros: {
    type: Array,
    default: () => []
  }
})

</script>

<template>
  <Libros :libros="libros" />
</template>


<script setup>
import Books from '~/components/Books.vue'

const goToBook = (book) => {
  const normalized = book.toLowerCase().replace(/ /g, ''); // este replace elimina espacios para formar la URL
  navigateTo(`/panel/libros/${normalized}/1`); //manda la ruta al libro seleccionado, asumiendo que el capítulo inicial es el 1
}

definePageMeta({ //definePageMeta es para configurar metadatos específicos de esta página, como el layout
  layout: 'panel'
})

</script>

<template>
  <Books @select="goToBook" />
</template>


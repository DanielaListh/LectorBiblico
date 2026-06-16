<script setup>
import { useRouter } from 'vue-router'; // useRouter es para navegar programáticamente entre rutas
import Books from '~/components/Books.vue'

const router = useRouter();

const goToBook = (book) => {
  const normalized = book.toLowerCase().replace(/ /g, ''); // este replace elimina espacios para formar la URL
  router.push(`/panel/libros/${normalized}/1`); //manda la ruta al libro seleccionado, asumiendo que el capítulo inicial es el 1
}

definePageMeta({ //definePageMeta es para configurar metadatos específicos de esta página, como el layout
  layout: 'panel'
})

</script>

<template>
  <Books :books="books" @select="goToBook" />
</template>


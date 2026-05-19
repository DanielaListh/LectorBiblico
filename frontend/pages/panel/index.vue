<script setup>
import { libros } from '~/data/libros'
import { useRouter } from 'vue-router'; // useRouter es para navegar programáticamente entre rutas
import Libros from '~/components/Libros.vue'

const router = useRouter();

const irLibro = (libro) => {
  const normalizado = libro.toLowerCase().replace(/ /g, ''); // este replace elimina espacios para formar la URL
  router.push(`/panel/libros/${normalizado}/1`); //manda la ruta al libro seleccionado, asumiendo que el capítulo inicial es el 1
}

definePageMeta({ //definePageMeta es para configurar metadatos específicos de esta página, como el layout
  layout: 'panel'
})

</script>

<template>
  <Libros :libros="libros" @select="irLibro" />
</template>


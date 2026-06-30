<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { chapterPerBooks } from '~/data/chapters'

const route = useRoute()
const router = useRouter()

// REACTIVO
const book = computed(() => route.params.book)

const currentChapter = computed (() => Number(route.params.chapter))

const totalChapters = computed(() => {
  return chapterPerBooks[book.value] || 0
})

const chapters = computed(() =>
  Array.from(
    { length: totalChapters.value },
    (_, i) => i + 1
  )
)

const goToChapter = (num) => {
  router.push(`/panel/libros/${book.value}/${num}`)
}
</script>

<template>
  <div class="h-full overflow-y-auto p-1">

    
    <template v-if="chapters.length > 0">
      <button
        v-for="chapter in chapters"
        :key="chapter"
        @click="goToChapter(chapter)"
        class="w-full text-left px-4 py-1 font-lexendExa rounded-lg transition duration-300 text-text1"
        :class="chapter === currentChapter
          ? 'bg-bg3 text-text2 font-bold'
          : 'text-text1 hover:bg-bg-2/80 hover:text-hoverText1'"
      >
        Capítulo {{ chapter }}
      </button>
    </template>

    <div v-else class="flex flex-col justify-center items-center mx-auto p-2 my-auto">
      <h2 class="font-lexendExa text-center text-text1">
        Selecciona un libro para ver sus capítulos
      </h2>
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
          <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        </svg>

    </div>

  </div>
</template>

import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted, watch } from 'vue'
import { chapterPerBooks } from '~/data/chapters'
import { getChapter } from '@/utils/getChapter'

export function useChapterNavigation() {
    const route = useRoute()
    const router = useRouter() 

    console.log(import.meta.env.VITE_SUPABASE_URL)
    console.log(import.meta.env.VITE_SUPABASE_ANON_KEY)


    const book = computed(() => route.params.book)
    const chapter = computed(() => Number(route.params.chapter))
    const totalChapters = computed(() => chapterPerBooks[book.value])

    const previousChapter = computed(() => { return chapter.value > 1 ? chapter.value - 1 : null })
    // Return the previous chapter number if the current chapter is greater than 1; otherwise return null

    const nextChapter = computed(() => { return chapter.value < totalChapters.value ? chapter.value + 1 : null })
    // return the next chapter number if the current chapter is lower than totalChapters; otherwise return null

    const loading = ref(true)
    const direction = ref('next')
    const data = ref({ verses: [] })

    const loadChapter = async () => {
        loading.value = true
        try {
            const content = await getChapter(book.value, chapter.value)
            data.value = content
        } catch (error) {
            console.error('Error al cargar el capítulo:', error)
        }
        loading.value = false
    }

    onMounted(loadChapter)

    watch(
        () => route.fullPath,
        () => { loadChapter() }
    )

    const goToChapter = async (num) => {
        await router.push(`/panel/libros/${route.params.book}/${num}`)

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

    }

    return {
        book,
        chapter,
        totalChapters,
        previousChapter,
        nextChapter,
        loading,
        direction,
        data,
        loadChapter,
        goToChapter
    }

}

















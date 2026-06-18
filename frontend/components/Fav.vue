<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuFav } from '~/composables/useMenuFav'

const router = useRouter()

// Reactive array where saved favorites will be loaded
const favorites = ref([])

const showColorMenu = ref(false)

onMounted(() => {
  const data = localStorage.getItem('highlights')
  favorites.value = data ? JSON.parse(data) : []
  sortFavorites()
})

const goToFavorite = (item) => {
  router.push({
    path: `/panel/libros/${item.book}/${item.chapter}`,
    query: { verses: item.verses[0] } // If it is a range, we take the first one.
    
  })

}

const {
  menu,
  openMenu,
  closeMenu,
  shareFavorite,
  deleteFavorite,
  togglePin,
  changeColor
} = useMenuFav(favorites)

const getFavoriteText = (item) => {
  const book = item.book
  const chapter = item.chapter
  const verses = item.verses

  return item.text || "(texto no guardado)"
}

const sortFavorites = () => {
  favorites.value.sort((a, b) => {
    if (a.book < b.book) return -1
    if (a.book > b.book) return 1
    return a.chapter - b.chapter
  })
}

onMounted(() => {
  document.addEventListener('click', closeMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenu)
})

</script>


<template> 
  <section class="p-4 flex flex-col h-[500px] overflow-y-auto">

    <div
        v-if="menu.visible"
        class="fixed z-[9999] bg-transparent w-40 h-40"
        :style="{top:menu.y + 'px', left:menu.x + 'px'}"
    >

        <!-- Compartir -->
        <div class="absolute top-10 left-4 -translate-x-1/2 rounded-full bg-bg3 p-1 hover:bg-bg4">
          <button
            class="flex items-center p-1 mx-auto"
            @click="shareFavorite(menu.item)"
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path :style="{ fill: 'var(--icon-color)'}" d="M9 12C9 13.3807 7.88071 14.5 6.5 14.5C5.11929 14.5 4 13.3807 4 12C4 10.6193 5.11929 9.5 6.5 9.5C7.88071 9.5 9 10.6193 9 12Z" />
              <path :style="{ stroke: 'var(--icon-color)'}" d="M14 6.5L9 10" />
              <path :style="{ stroke: 'var(--icon-color)'}" d="M14 17.5L9 14" />
              <path :style="{ fill: 'var(--icon-color)'}" d="M19 18.5C19 19.8807 17.8807 21 16.5 21C15.1193 21 14 19.8807 14 18.5C14 17.1193 15.1193 16 16.5 16C17.8807 16 19 17.1193 19 18.5Z" />
              <path :style="{ fill: 'var(--icon-color)'}" d="M19 5.5C19 6.88071 17.8807 8 16.5 8C15.1193 8 14 6.88071 14 5.5C14 4.11929 15.1193 3 16.5 3C17.8807 3 19 4.11929 19 5.5Z" />
            </svg>
          </button>
        </div> 
         

        <!-- Eliminar -->
        <div class="absolute left-8 top-8 -translate-y-1/2 rounded-full bg-bg3 p-1 hover:bg-bg4">
          <button
            class="flex items-center p-1 mx-auto"
            @click="deleteFavorite(menu.item.id)"
          >
            <svg class="w-7 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path :style="{ stroke: 'var(--icon-color)' }" d="M20.5001 6H3.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
              <path :style="{ stroke: 'var(--icon-color)'}" d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4" 
              stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
              <path :style="{ stroke: 'var(--icon-color)'}" d="M18.3735 15.3991C18.1965 
              18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 
              21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 
              8.5M18.8334 8.5L18.6334 11.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div> 
        

        <!-- Pinear -->
        <div class="absolute right-10 top-8 -translate-y-1/2 rounded-full bg-bg3 p-1 hover:bg-bg4"> 
          <button
            class="flex items-center p-1 mx-auto"
            @click="togglePin(menu.item)"
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path  :style="{ fill: 'var(--icon-color)'}"
              d="M17.1218 1.87023C15.7573 0.505682 13.4779 0.76575 12.4558 2.40261L9.61062 
              6.95916C9.61033 6.95965 9.60913 6.96167 9.6038 6.96549C9.59728 6.97016 9.58336 6.97822 
              9.56001 6.9848C9.50899 6.99916 9.44234 6.99805 9.38281 6.97599C8.41173 6.61599 6.74483 
              6.22052 5.01389 6.87251C4.08132 7.22378 3.61596 8.03222 3.56525 8.85243C3.51687 9.63502 
              3.83293 10.4395 4.41425 11.0208L7.94975 14.5563L1.26973 21.2363C0.879206 21.6269 0.879206 
              22.26 1.26973 22.6506C1.66025 23.0411 2.29342 23.0411 2.68394 22.6506L9.36397 
              15.9705L12.8995 19.5061C13.4808 20.0874 14.2853 20.4035 15.0679 20.3551C15.8881 20.3044 
              16.6966 19.839 17.0478 18.9065C17.6998 17.1755 17.3043 15.5086 16.9444 14.5375C16.9223 
              14.478 16.9212 14.4114 16.9355 14.3603C16.9421 14.337 16.9502 14.3231 16.9549 14.3165C16.9587 
              14.3112 16.9606 14.31 16.9611 14.3098L21.5177 11.4645C23.1546 10.4424 23.4147 8.16307 22.0501 
              6.79853L17.1218 1.87023ZM14.1523 3.46191C14.493 2.91629 15.2528 2.8296 15.7076 3.28445L20.6359 
              8.21274C21.0907 8.66759 21.0041 9.42737 20.4584 9.76806L15.9019 12.6133C14.9572 13.2032 14.7469 
              14.3637 15.0691 15.2327C15.3549 16.0037 15.5829 17.1217 15.1762 18.2015C15.1484 18.2752 15.1175 
              18.3018 15.0985 18.3149C15.0743 18.3316 15.0266 18.3538 14.9445 18.3589C14.767 18.3699 14.5135 
              18.2916 14.3137 18.0919L5.82846 9.6066C5.62872 9.40686 5.55046 9.15333 5.56144 8.97583C5.56651 
              8.8937 5.58877 8.84605 5.60548 8.82181C5.61855 8.80285 5.64516 8.7719 5.71886 8.74414C6.79869 
              8.33741 7.91661 8.56545 8.68762 8.85128C9.55668 9.17345 10.7171 8.96318 11.3071 8.01845L14.1523 
              3.46191Z"/>
            </svg>
          </button>
        </div> 

        <!-- Cambiar color -->
        <div class="absolute top-12 left-32 -translate-x-1/2 rounded-full bg-bg3 hover:bg-bg4 p-1 mx-auto">
          <button
            :style="{ background: color }"
            @click.stop="showColorMenu = !showColorMenu"
            class="p-1 mx-auto"
          >
            <svg class="w-6 h-6" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path 
                :style="{ fill: 'var(--icon-color)'}" 
                d="M8.25 0c-6.38 0-9.11 7.38-8.010 9.92 0.82 1.89 2.62 0.080 3.34 1 1.88 2.46-2.11 
                3.81 0.090 4.68 2.59 1.060 12.33 0.4 12.33-8.53 0-2.69-1.34-7.070-7.75-7.070zM4.47 
                9c-0.815-0.017-1.47-0.682-1.47-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5c0 
                0 0 0 0 0 0 0.828-0.672 1.5-1.5 1.5-0.011 0-0.021-0-0.032-0zM6 3.5c0-0.828 
                0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5-0.672 1.5-1.5 1.5c-0.011 0-0.021-0-0.032-0-0.814-0.017-1.468-0.682-1.468-1.5 0-0 0-0 0-0zM8.47 
                14c-0.815-0.017-1.47-0.682-1.47-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5c0 0 0 0 0 0 0 
                0.828-0.672 1.5-1.5 1.5-0.011 0-0.021-0-0.032-0zM12.47 11c-0.815-0.017-1.47-0.682-1.47-1.5 0-0.828 
                0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5c0 0 0 0 0 0 0 0.828-0.672 1.5-1.5 1.5-0.011 0-0.021-0-0.032-0zM12.47 
                6c-0.815-0.017-1.47-0.682-1.47-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5c0 0 0 0 0 0 0 
                0.828-0.672 1.5-1.5 1.5-0.011 0-0.021-0-0.032-0z"
              ></path>
            </svg>
          </button>
          <Transition name="fade">
            <div
              v-if="showColorMenu"
              class="absolute top-12
                    block gap-2 bg-bg3 rounded-full p-2"
            >

              <button
                v-for="color in [
                  '#d8c3a6',
                  '#dcc16b',
                  '#ca7f56',
                  '#994d2c',
                  '#9baa5e',
                  '#54523a',
                  '#734f3a'
                ]"
                :key="color"
                class="w-6 h-6 rounded-full"
                :style="{ background: color }"
                @click.stop="changeColor(menu.item, color)"
              />

            </div>
          </Transition>
        </div>

      </div>

    <h2 class="text-[#5b493b] font-lexendExa flex  w-full text-4xl h-[50px] font-semibold my-2">Mis favoritos</h2>
    
    <!-- masonry-->
    <div class=" columns-3 gap-4 w-full ">

      <!-- cards -->
      <div
        v-for="item in favorites"
        :key="item.id"
        @click="goToFavorite(item)"
        class=" cursor-pointer break-inside-avoid p-3 rounded-xl font-lexendExa mb-4"
        :style="{ background:item.bgColor || 'var(--bg2)'}"
      >
        <div
          
          class="flex justify-between items-center">
          <h3 class="font-semibold text-text1 font-lexendExa">
            {{ item.book }} {{ item.chapter }} :
            <span v-if="item.verses && item.verses.length === 1">
            {{ item.verses[0] }}
            </span> 
            <span 
              v-else-if="item.verses && item.verses.length > 1"
              @click="goToFavorite(item)" 
            > ?
              [{{ item.verses[0] }} - {{ item.verses[item.verses.length - 1] }}] 
              // 😭 range of numbers for the selected and highlights verses, example: [4 - 7]

            </span>
          </h3>
          <button
            @click.stop="openMenu($event, item)"
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path :style="{ fill: 'var(--icon-color)'}" d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 
              3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z" />
              <path :style="{ fill: 'var(--icon-color)'}" d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 
              10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" />
              <path :style="{ fill: 'var(--icon-color)'}" d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 
              17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z" />
            </svg>
          </button>
        </div>
          <p class="text-text2 mt-2"
          >
            {{ getFavoriteText(item) }}
          </p>
      </div>
      

    </div>
  </section>
</template>

import { ref } from "vue";
import { highlightColors, highlightTextColors } from "~/data/highlightColors";

export function useMenuFav(favorites) {
    const menu = ref({
        visible: false,
        x: 0,
        y: 0,
        item: null
    })

    const openMenu = (event, item) => {
        event.stopPropagation()

        if (menu.value.visible && menu.value.item?.id === item.id) {
            menu.value.visible = false
            return
        }

        menu.value = {
            visible: true,
            x: event.clientX - 70,
            y: event.clientY - 70,
            item
        }
    }

    const closeMenu = () => { 
        menu.value.visible = false
    }

    const shareFavorite = async (item) => {
        const text = `${item.book} ${item.chapter}:${item.verses.join(', ')} - ${item.text}`

        if (navigator.share) {
            await navigator.share({ text })
            
        } else {
            navigator.clipboard.writeText(text)
            alert("Copiado al portapapeles")
        }
        closeMenu()
    }

    const deleteFavorite = (id) => {
        favorites.value = favorites.value.filter(favorite => favorite.id !== id)
        //sortFavorites()
        localStorage.setItem("highlights", JSON.stringify(favorites.value))
        closeMenu()
    }

    const togglePin = (item) => {
        const pinned = favorites.value.filter(favorite => favorite.pinned)

        if (!item.pinned && pinned.length >= 3) {
            // insert a push notify
            return
        }
        item.pinned = !item.pinned

        favorites.value.sort((a, b) => {
            if (a.pinned && !b.pinned) return -1
            if(!a.pinned && b.pinned) return 1

            if (a.book < b.book) return -1
            if (a.book > b.book) return 1
            return a.chapter - b.chapter
        })

        localStorage.setItem("highlights", JSON.stringify(favorites.value))
        closeMenu()
    }

    const changeColor = (item, color) => {
        item.bgColor = color
        item.textColor = highlightTextColors[color]

        //sync original colors
        const stored = JSON.parse(localStorage.getItem("highlights")) || []
        const index = stored.findIndex(favorite => favorite.id === item.id)

        if (index !== -1) {
            stored[index].bgColor = color
            stored[index].textColor = highlightTextColors[color]
            localStorage.setItem("highlights", JSON.stringify(stored))    
        }

        window.dispatchEvent(new Event ('updated-results'))
        closeMenu()
    }


    return {
        menu,
        openMenu,
        closeMenu,
        shareFavorite,
        deleteFavorite,
        togglePin,
        changeColor
    }
}
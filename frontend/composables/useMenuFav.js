import { ref } from "vue";

export function useMenuFav(favorites) {
    const menu = ref({
        visible: false,
        x: 0,
        y: 0,
        item: null
    })

    const openMenu = (event, item) => {
        event.stopPropagation()

        menu.value = {
            visible: true,
            x: event.ClientX,
            y: event.ClientY,
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

    const deleletFavorite = (id) => {
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
        localStorage.setItem("highlights", JSON.stringify(favorites.value))
        closeMenu()
    }

    const changeColor = (item, color) => {
        item.bgColor = color
        localStorage.setItem("highlights", JSON.stringify(favorites.value))
        closeMenu()
    }


    return {
        menu,
        openMenu,
        closeMenu,
        shareFavorite,
        deleletFavorite,
        togglePin,
        changeColor
    }
}
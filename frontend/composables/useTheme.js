import { ref, onMounted } from 'vue'

const isDark = ref(false)

export function useTheme() {

    const setTheme = (value) => {
        isDark.value = value 
        localStorage.setItem('theme', value ? 'dark' : 'light')
    }


    onMounted(() => {
        const saved = localStorage.getItem('theme')

        if (saved) {
            isDark.value = saved === 'dark'
        } else {
            //detectar el tema del sistema
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            isDark.value = prefersDark
        }
    })


    const toggleTheme = () => {
        setTheme(!isDark.value)
    }

    return {isDark, toggleTheme, setTheme}
}
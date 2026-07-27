export function useTheme() {

    const colorMode = useColorMode()
    
    const isDark = computed(() => {
        return colorMode.value === 'dark'
    })

    const toggleTheme = () => {
        colorMode.preference = isDark.value ? 'light' : 'dark'
    }

    return { isDark, toggleTheme }
}
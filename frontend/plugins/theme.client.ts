export default defineNuxtPlugin(() => {
  const { isDark } = useTheme()

  watchEffect(() => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })
})

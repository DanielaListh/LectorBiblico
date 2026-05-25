<script setup>

import { RouterLink } from 'vue-router';
import logoLight from '~/public/img/logo-light.png'
import logoDark from '~/public/img/logo-dark.png'

const isDark = useColorMode().value === 'dark'

</script>

<template>
    <section class="flex justify-center items-center ">
        <RouterLink to="/">
            <button>
                <img :src="isDark ? logoDark : logoLight" alt="logo" class="h-[70px]">
            </button>
        </RouterLink>
        
    </section>
</template>
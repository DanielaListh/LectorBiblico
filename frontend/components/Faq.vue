<script setup>
    const preguntas = ["nota1", "nota2", "nota3", "nota4", "nota5", "nota6"]
</script>

<template>
    <section class="h-auto mx-auto flex items-center justify-center flex-col py-20">
       <h2 class="font-cinzel text-[#5b493b] m-[20px] text-5xl">Preguntas Frecuentes</h2> 
       <div class="bg-[url('/img/noe.png')] bg-cover bg-center h-[85vh] w-[85%] mx-auto m-[20px]">
            <ul>
                <li 
                    v-for="pregunta in preguntas" :key="pregunta"
                    class="
                    flex justify-center gap-5
                    w-auto min-w-[100px] max-w-[350px] 
                    h-auto max-h-[200px] 
                    m-[10px] p[10px] 
                    border-4 rounded-lg border-[#5b493b] 
                    bg-[#fff8ef] hover:border-[#ffb648]
                    font-lexendExa text-[#5b493b]
                    ">
                    {{ pregunta }}
                </li>
            </ul>
            
       </div>    
    </section>
</template>
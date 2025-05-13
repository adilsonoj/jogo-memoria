<template>
    <div class="score">
        <div class="score-title">Sua pontuação: </div>
        <div class="score-value">{{ displayScore }}</div>
    </div>
</template>

<script setup>
import { useCountDown } from "../store"
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
const store = useCountDown();
const { finishTime, initTime } = storeToRefs(store)

// Pontuação real calculada
const score = computed(() => {
    if (!finishTime.value || !initTime.value) return 0;
    
    const pontuacao = Math.round((finishTime.value * 100) / initTime.value);
    return pontuacao;
})

// Para o efeito de contagem
const displayScore = ref(0);
const animateScore = (targetScore) => {
    let start = 0;
    const duration = 1500; // duração da animação em ms
    const startTime = Date.now();
    
    const updateScore = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        
        if (elapsed < duration) {
            displayScore.value = Math.floor(start + (targetScore - start) * (elapsed / duration));
            requestAnimationFrame(updateScore);
        } else {
            displayScore.value = targetScore;
        }
    };
    
    start = displayScore.value;
    updateScore();
};

// Observa mudanças na pontuação para iniciar a animação
watch(score, (newScore) => {
    animateScore(newScore);
}, { immediate: true });

</script>
<style scoped>
.score {
   display: flex;
   justify-content: space-around;
   align-items: center;

   width: 100%;
}
.score-title {
    display: flex;
    width: 70%;
    justify-content: center;
}
.score-value {
    display: flex;
    width: 30%;
    justify-content: center;
}
</style>


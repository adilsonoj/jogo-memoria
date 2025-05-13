<template>
    <Transition name="dialog">
        <div v-if="show" class="dialog-container">
            <div class="dialog-content">
                <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7" />
                </svg>
                <span>Você Ganhou!</span>
                <Score />
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref, watch } from 'vue';
import Score from './Score.vue'

const props = defineProps({
    status: {
        type: String,
        default: ''
    }
});

const show = ref(false);

watch(() => props.status, (newStatus) => {
    if (newStatus === 'success') {
        show.value = true;
        setTimeout(() => {
            show.value = false;
        }, 10000);
    }
});
</script>

<style scoped>
.dialog-container {
    position: fixed;
    display: flex;
    width: 100%;
    height: calc(100vh - 120px);
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.dialog-content {
    background-color: #22c55e;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    font-size: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 40%;
}

.check-icon {
    width:  120px;
    height: 120px;
}

/* Animações */
.dialog-enter-active {
    animation: bounce-in 0.8s ease-out;
}

.dialog-leave-active {
    animation: fade-out 0.5s ease-in forwards;
}

@keyframes bounce-in {
    0% {
        transform: scale(0.3);
        opacity: 0;
    }
    50% {
        transform: scale(1.1);
        opacity: 0.7;
    }
    70% {
        transform: scale(0.95);
        opacity: 0.85;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes fade-out {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(0.5);
        opacity: 0;
    }
}

@media (max-width: 425px) {
    .dialog-content {
        font-size: 22px;
    }
}
</style>
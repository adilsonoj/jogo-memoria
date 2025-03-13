<template>
    <Transition name="dialog">
        <div v-if="show" class="dialog-container">
            <div class="dialog-content">
                <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7" />
                </svg>
                <span>Você Ganhou!</span>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref, watch } from 'vue';

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
        }, 3000);
    }
});
</script>

<style scoped>
.dialog-container {
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translateX(-50%);
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
    width: 100%;
}

.check-icon {
    width:  120px;
    height: 120px;
}

/* Animações */
.dialog-enter-active {
    transition: all 0.3s ease-out;
}

.dialog-leave-active {
    transition: all 0.2s ease-in;
}

.dialog-enter-from {
    transform: translate(-50%, -16px);
    opacity: 0;
}

.dialog-enter-to {
    transform: translate(-50%, 0);
    opacity: 1;
}

.dialog-leave-from {
    transform: translate(-50%, 0);
    opacity: 1;
}

.dialog-leave-to {
    transform: translate(-50%, -16px);
    opacity: 0;
}
</style> 
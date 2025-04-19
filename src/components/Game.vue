<template>
    <div class="winner-lottie" v-if="winner">
        <Vue3Lottie :animationData="confeti" loop="false"/>
    </div>
    <div class="loser-lottie" v-if="loser">
        <Vue3Lottie :animationData="loserLottie" style="width: 40%" loop="false"/>
    </div>
    <SuccessDialog :status="winner && 'success'" />
    <div class="grid">
        <div v-for="card in cards" class="card-grid" :class="card.shake" id="card_container">
            <Transition name="flip">
                <div v-show="card.open" @click="change(card)" class="card">
                    <img :src="card.image" alt="">
                </div>
            </Transition>
            <Transition name="flip">
                <div v-show="!card.open" @click="change(card)" class="card">
                    <img :src="logo">
                </div>
            </Transition>
        </div>
    </div>
</template>
<script setup>
import { computed,  ref } from '@vue/reactivity';
import { storeToRefs } from 'pinia';
import { nextTick, watch } from 'vue';
import SuccessDialog from './SuccessDialog.vue';
import { Vue3Lottie } from 'vue3-lottie';

import confeti from "../assets/lottie/confeti.json"
import loserLottie from "../assets/lottie/loser.json"

import { useCountDown } from "../store"

const props = defineProps({
    payload: {
        type: Object,
        required: true
    }
})
const store = useCountDown();
const logo = ref("")
const { finish, action } = storeToRefs(store)
const anim = ref(null);
const cards = ref([])

const paserCards = () => {
    let count = 0;
    logo.value = props.payload.logo
    for(let i = 0; i < 8; i++){
        console.log(props.payload[`imagem${i}`]);
        if(props.payload[`imagem${i}`]){
            cards.value.push({
                id: count++,
                hash: props.payload[`imagem${i}`],
                image: props.payload[`imagem${i}`],
                open: false,
                win: false,
                sort: 0,
                shake: '',
            })
            
            cards.value.push({
                id: count++,
                hash: props.payload[`imagem${i}`],
                image: props.payload[`imagem${i}`],
                open: false,
                win: false,
                sort: 0,
                shake: '',
            })
        }
    }
}

paserCards()





const open = ref([])
const shake = ref("shake")

const change = (card) => {
    if (card.win) return
    if (store.action != 'start') return

    if (card.open) {
        open.value = open.value.filter(e => e.id != card.id)
        card.open = !card.open;
        return
    }

    if (open.value.length == 2) return;
    open.value.push(card);
    card.open = !card.open;

    nextTick(() => {
        if (open.value.length == 2) {
            if (open.value[0].hash == open.value[1].hash) {
                store.setCardStatus('success')
                open.value[0].win = true
                open.value[1].win = true
                open.value = []
                setTimeout(() => store.setCardStatus(''), 1500)
            } else {
                store.setCardStatus('error')
                open.value[0].shake = 'shake'
                open.value[1].shake = 'shake'
                setTimeout(() => {
                    open.value[0].open = false
                    open.value[1].open = false
                    open.value[0].shake = ''
                    open.value[1].shake = ''
                    open.value = []
                    store.setCardStatus('')
                }, 1500)
            }
        }
    })
}

const winner = computed(() => {
    if(cards.value.length == 0) return false;
    return cards.value.every(e => e.win)
})

const loser = computed(() => {
    if(cards.value.length == 0) return false;
    return finish.value && !cards.value.every(e => e.win)
})

watch(winner, (val) => {
    if (val) {
        store.setAction('reset');
        open.value = []
    }
})

watch(loser, (val) => {
    if (val) {
        store.setLoser();
    }
})

watch(action, (val) => {
    if (val == 'start') {
        reset();
    }
})

const reset = () => {
    cards.value.forEach(e => {
        e.open = false;
        e.win = false;
    })
    open.value = []
    shuffle()
}

const shuffle = () => {
    cards.value.forEach(value => { value.sort = Math.random() })
    cards.value.sort((a, b) => a.sort - b.sort)
}

shuffle()
</script>
<style scoped>
.flip-enter-active {
    transition: all 0.3s ease;
}

.flip-leave-active {
    display: none;
}

.flip-enter-from,
.flip-leave-to {
    transform: rotateY(180deg);
    opacity: 0;
}

/* .container {
    display: grid;
    --grid-template-columns: repeat(8, 1fr);
    --grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    place-items: center;
    position: relative;
    width: 100%;
    height: 100vh;
}

.card-container {
    cursor: pointer;
    padding: 2px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 2s ease;
    overflow: hidden;
    
} */

.card {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;

}

.card img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Mantém a proporção da imagem */
    max-width: 100%;
    max-height: 100%;
}






.winner-lottie {
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 100;
    z-index: 100;
    margin: 0 auto;

}

.loser-lottie {
    height: 100vh;
    width: 100%;
    position: fixed;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;

}


.shake {
    animation: shake 0.5s;
    animation-iteration-count: 1;
}


@keyframes shake {
    0% {
        transform: translate(1px, 1px)
    }

    10% {
        transform: translate(-1px, -2px)
    }

    20% {
        transform: translate(-3px, 0px)
    }

    30% {
        transform: translate(3px, 2px)
    }

    40% {
        transform: translate(1px, -1px)
    }

    50% {
        transform: translate(-1px, 2px)
    }

    60% {
        transform: translate(-3px, 1px)
    }

    70% {
        transform: translate(3px, 1px)
    }

    80% {
        transform: translate(-1px, -1px)
    }

    90% {
        transform: translate(1px, 2px)
    }

    100% {
        transform: translate(1px, -2px)
    }
}

/* @media (max-width: 420px) {
    .container {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
} */

/* 
@media (max-width: 600px) {
    .container {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media ((min-width: 601px) and (max-width: 960px)) {
    .container {
        grid-template-columns: repeat(6, 1fr);
    }

    .card-container {
        height: 160px;
        width: 110px;
        padding: 0.3em;
    }
}

@media ((min-width: 960px) and (max-width: 1920px)) {
    .card-container {
        height: calc(225px + 50px);
        width: calc(150px + 50px);
    }
} */

.grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* grid-template-rows: repeat(4, 1fr); */
    gap: 16px;
    padding: 16px;
    height: calc(100vh - 160px);
    /* Ajusta altura considerando o header */
    width: 100%;
    box-sizing: border-box;
    
}

.card-grid {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
    /* aspect-ratio: 3/4; */
    cursor: pointer;
    transition: transform 0.2s;
    padding: 30px;
    background-color: #fff;
    position: relative;
}

/* .card:hover {
  transform: scale(1.02);
} */

/* @media (max-width: 600px) {
  .grid {
    gap: 8px;
    padding: 8px;
  }
} */
</style>
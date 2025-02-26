<template>
    <div class="winner-lottie" v-if="winner">
        <lottie-animation ref="anim" :animationData="confeti" />
    </div>
    <div class="loser-lottie" v-if="loser">
        <lottie-animation ref="anim" :animationData="loserLottie" style="width: 40%" />
    </div>
    <div class="container">
        <div v-for="card in cards" class="card-container" :class="card.shake" id="card_container">
            <Transition name="flip">
                <div class="card" v-show="card.open" @click="change(card)">
                    <img :src="card.image" alt="" class="card-img" >
                </div>
            </Transition>
            <Transition name="flip">
                <div class="card" v-show="!card.open" @click="change(card)">
                    <img src="../assets/fundo.jpeg">
                </div>
            </Transition>
        </div>
    </div>
</template>
<script setup>
import { computed, reactive, ref } from '@vue/reactivity';
import { storeToRefs } from 'pinia';
import { nextTick, watch } from 'vue';

import confeti from "../assets/lottie/confeti.json"
import loserLottie from "../assets/lottie/loser.json"
import img1 from "../assets/cards/1.png"
import img2 from "../assets/cards/2.png"
import img3 from "../assets/cards/3.png"
import img4 from "../assets/cards/4.png"
import img5 from "../assets/cards/5.png"
import img6 from "../assets/cards/6.png"
import img7 from "../assets/cards/7.png"
import img10 from "../assets/cards/10.png"

import { useCountDown } from "../store"

const store = useCountDown();
const { finish, action } = storeToRefs(store)
const anim = ref(null);
const cards = reactive([
    {
        id: 0,
        hash: 0,
        image: img1,
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 1,
        hash: 0,
        image: img1,
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 2,
        hash: 1,
       image: img2,
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 3,
        hash: 1,
       image: img2,
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 4,
        hash: 2,
        image: img3,
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 5,
        hash: 2,
        image: img3,
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 6,
        hash: 3,
        image: img4,
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 7,
        hash: 3,
        image: img4,
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 8,
        hash: 4,
        image: img5,
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 9,
        hash: 4,
        image: img5,
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 10,
        hash: 5,
        image: img6,
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 11,
        hash: 5,
        image: img6,
        shake: '',
    },
    {
        id: 12,
        hash: 6,
       image: img7,
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 13,
        hash: 6,
       image: img7,
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 14,
        hash: 7,
        image: img10,
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 15,
        hash: 7,
        image: img10,
        open: false,
        win: false,
        sort: 0,
    }
])

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
    return cards.every(e => e.win)
})

const loser = computed(() => {
    return finish.value && !cards.every(e => e.win)
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
    cards.forEach(e => {
        e.open = false;
        e.win = false;
    })
    open.value = []
    shuffle()
}

const shuffle = () => {
    cards.forEach(value => { value.sort = Math.random() })
    cards.sort((a, b) => a.sort - b.sort)
}

shuffle()
</script>
<style scoped>
img {
    width: 100%;
    height: 100%;
}

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

.container {
    display: grid;
    --grid-template-columns: repeat(8, 1fr);
    --grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    place-items: center;

    position: relative;
}

.card-container {
    cursor: pointer;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 2s ease;
}


.card {
    margin: 0px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
}

.card .card-img {
    width: 100%;
    height: auto;
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

@media (max-width: 420px) {
    .container {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
}

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
</style>
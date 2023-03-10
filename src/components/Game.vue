<template>
    <div class="winner-lottie" v-if="winner">
        <lottie-animation ref="anim" :animationData="confeti" />
    </div>
    <div>
        <span v-if="loser">Perdeu</span>
    </div>
    <div class="container">
        <!-- <button @click="reset">Reset</button> -->
        <div v-for="card in cards">
            <Transition name="flip">
                <div class="card" v-show="card.open" @click="change(card)">
                    <img width="150" height="225" :src="card.image" alt="" srcset="">
                </div>
            </Transition>
            <Transition name="flip">
                <div class="card" v-show="!card.open" @click="change(card)">

                    <img width="150" height="225"
                        src="https://images.unsplash.com/photo-1588421357574-87938a86fa28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        alt="" srcset="">
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
import { useCountDown } from "../store"

const emit = defineEmits(['winner'])
const store = useCountDown();
const { finish } = storeToRefs(store)

const anim = ref(null);
const cards = reactive([
    {
        id: 0,
        hash: 0,
        image: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
        open: false,
        win: false,
        sort: 0,
    },
    {
        id: 1,
        hash: 1,
        image: "https://images.unsplash.com/photo-1588001832198-c15cff59b078?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        open: false,
        win: false,
        sort: 0,
    },
    {
        id: 2,
        hash: 0,
        image: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
        open: false,
        win: false,
        sort: 0,
    },
    {
        id: 3,
        hash: 1,
        image: "https://images.unsplash.com/photo-1588001832198-c15cff59b078?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        open: false,
        win: false,
        sort: 0,
    },
    {
        id: 4,
        hash: 0,
        image: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
        open: false,
        win: false,
        sort: 0,
    },
    {
        id: 5,
        hash: 1,
        image: "https://images.unsplash.com/photo-1588001832198-c15cff59b078?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        open: false,
        win: false,
        sort: 0,
    },
    {
        id: 6,
        hash: 0,
        image: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
        open: false,
        win: false,
        sort: 0,
    },
    {
        id: 7,
        hash: 1,
        image: "https://images.unsplash.com/photo-1588001832198-c15cff59b078?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        open: false,
        win: false,
        sort: 0,
    },
    {
        id: 8,
        hash: 0,
        image: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
        open: false,
        win: false,
        sort: 0,
    },
    {
        id: 9,
        hash: 1,
        image: "https://images.unsplash.com/photo-1588001832198-c15cff59b078?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        open: false,
        win: false,
        sort: 0,
    },
    {
        id: 10,
        hash: 0,
        image: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
        open: false,
        win: false,
        sort: 0,
    },
    {
        id: 11,
        hash: 1,
        image: "https://images.unsplash.com/photo-1588001832198-c15cff59b078?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        open: false,
        win: false,
        sort: 0,
    }
])

const open = ref([])

const change = (card) => {
    if (card.win) return

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
            console.log("verificar")
            if (open.value[0].hash == open.value[1].hash) {
                open.value[0].win = true
                open.value[1].win = true
                open.value = []
            } else {
                setTimeout(() => {
                    open.value[0].open = false
                    open.value[1].open = false
                    open.value = []
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
        // store.resetar(true);
        store.setAction('reset');
        setTimeout(() => {
            reset();
        }, 3000)
    }
})

const reset = () => {
    cards.forEach(e => {
        e.open = false;
        e.win = false;
    })
    open.value = []
}

const shuffle = () => {
    cards.forEach(value => { value.sort = Math.random() })
    cards.sort((a, b) => a.sort - b.sort)
}

shuffle()
</script>
<style scoped>
.flip-enter-active {
    transition: all 0.4s ease;
}

.flip-leave-active {
    display: none;
}

.flip-enter-from,
.flip-leave-to {
    transform: rotateY(180deg);
    opacity: 0;
}

.back-card {
    width: 150px;
    height: 225px;
    background-color: aquamarine;
}

.container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, 1fr);

    position: relative;
}

.card {
    padding: 2em;
}

.winner-lottie {
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 100;
    margin: 0 auto;
}

@media (max-width: 600px) {
    .container {
        grid-template-columns: repeat(3, 1fr);
        /* grid-template-rows: repeat(2, 1fr); */
    }
}

@media ((min-width: 601px) and (max-width: 900px)) {
    .container {
        grid-template-columns: repeat(4, 1fr);
        /* grid-template-rows: repeat(2, 1fr); */
    }
}
</style>
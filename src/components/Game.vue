<template>
    <div class="winner-lottie" v-if="winner">
        <lottie-animation ref="anim" :animationData="confeti" />
    </div>

    <div class="container">
        <!-- <button @click="reset">Reset</button> -->
        <div v-for="card in cards" class="card-container" :class="card.shake" id="card_container">
            <Transition name="flip">
                <div class="card" v-show="card.open" @click="change(card)">
                    <img :src="card.image" alt="" srcset="">
                </div>
            </Transition>
            <Transition name="flip">
                <div class="card" v-show="!card.open" @click="change(card)">

                    <img src="https://images.unsplash.com/photo-1588421357574-87938a86fa28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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
const { finish, action } = storeToRefs(store)

const anim = ref(null);
const cards = reactive([
    {
        id: 0,
        hash: 0,
        image: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 1,
        hash: 0,
        image: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 2,
        hash: 1,
        image: "https://images.unsplash.com/photo-1533387520709-752d83de3630?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 3,
        hash: 1,
        image: "https://images.unsplash.com/photo-1533387520709-752d83de3630?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 4,
        hash: 2,
        image: "https://images.unsplash.com/photo-1588001832198-c15cff59b078?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 5,
        hash: 2,
        image: "https://images.unsplash.com/photo-1588001832198-c15cff59b078?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 6,
        hash: 3,
        image: "https://images.unsplash.com/photo-1531604250646-2f0e818c4f06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvciUyMGRvJTIwc29sfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 7,
        hash: 3,
        image: "https://images.unsplash.com/photo-1531604250646-2f0e818c4f06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvciUyMGRvJTIwc29sfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 8,
        hash: 4,
        image: "https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvciUyMGRvJTIwc29sfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 9,
        hash: 4,
        image: "https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvciUyMGRvJTIwc29sfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 10,
        hash: 5,
        image: "https://images.unsplash.com/photo-1585089858717-f4378c2031d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBvciUyMGRvJTIwc29sfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        open: false,
        win: false,
        sort: 0,
        shake: '',
    },
    {
        id: 11,
        hash: 5,
        image: "https://images.unsplash.com/photo-1585089858717-f4378c2031d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBvciUyMGRvJTIwc29sfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        open: false,
        win: false,
        sort: 0,
        shake: '',
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
                open.value[0].win = true
                open.value[1].win = true
                open.value = []
            } else {
                open.value[0].shake = 'shake'
                open.value[1].shake = 'shake'
                setTimeout(() => {
                    open.value[0].open = false
                    open.value[1].open = false
                    open.value[0].shake = ''
                    open.value[1].shake = ''
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
    /* transition: all 0.3s ease; */
    transition: all 0.3s ease;
    --transform-style: preserve-3d;

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
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, 1fr);
    place-items: center;
}

.card-container {
    cursor: pointer;
    height: 225px;
    width: 150px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 2s ease;
}


.card {
    margin: 0px;
    height: 100%;
    width: 100%;

}

.winner-lottie {
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 100;
    margin: 0 auto;
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

@media ((min-width: 901px) and (max-width: 1920px)) {
    .card-container {
        height: calc(225px + 50px);
        width: calc(150px + 50px);
    }
}
</style>
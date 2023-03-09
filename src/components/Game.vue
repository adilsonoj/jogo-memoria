<template>

<div class="container">
    <button @click="reset">Reset</button>
    <div v-for="card in cards">
        <Transition name="flip">
            <div class="card" v-show="card.open" @click="change(card)">
                <img width="150" height="225" :src="card.image" alt="" srcset="">
            </div>
        </Transition>
        <Transition name="flip">
            <div class="card"  v-show="!card.open" @click="change(card)">
                
                <img width="150"  height="225" src="https://images.unsplash.com/photo-1588421357574-87938a86fa28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" srcset="">
            </div>
        </Transition>
    </div>
</div>


</template>
<script setup>
import { reactive, ref } from '@vue/reactivity';
import { nextTick } from 'vue';


const cards = reactive([
    {
        id:0,
        hash: 0,
        image: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
        open: false,
        win: false
    },
    {
        id:1,
        hash: 1,
        image: "https://images.unsplash.com/photo-1588001832198-c15cff59b078?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        open: false,
        win: false
    },
    {
        id:2,
        hash: 0,
        image: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
        open: false,
        win: false
    },
    {
        id:3,
        hash: 1,
        image: "https://images.unsplash.com/photo-1588001832198-c15cff59b078?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        open: false,
        win: false
    }
])

const open = ref([])

const change = (card) => {
    if(card.win) return


    if(card.open){
        open.value = open.value.filter(e => e.id != card.id)
        card.open = !card.open;
        return
    }

    if(open.value.length ==2) return;
    open.value.push(card);
    card.open = !card.open;

    nextTick(()=>{
        if(open.value.length ==2){
            console.log("verificar")
            if(open.value[0].hash == open.value[1].hash){
                open.value[0].win = true
                open.value[1].win = true
                open.value = []
            }
        }
    })
}

const reset = ()=>{
    cards.forEach(e => {
        e.open = false;
        e.win = false;
    })
    open.value=[]
}
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

.back-card{
    width: 150px;
    height: 225px;
    background-color: aquamarine;
}

.container{
    display: flex;
}

</style>
<script setup>
import { ref, computed } from '@vue/reactivity'
import { watch } from 'vue';
import { useCountDown } from "../store"
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue';

const props = defineProps({
    time: {
        type: String,
        required: false
    }
})

let initTime = props.time || 60;

// onMounted(() => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const segundos = urlParams.get('segundos');
//   if (segundos) {
//     initTime = parseInt(segundos);
//     count.value = initTime;
//   }
// });


const store = useCountDown();
const {  action } = storeToRefs(store)

store.setInitTime(initTime)


const emit = defineEmits(['finish'])
let interval = null;

const count = ref(initTime)
const countDown = () => {
  count.value = initTime;
  interval = setInterval(function () {
    --count.value
  
    if (count.value == 0) {
      clearInterval(interval);
      console.log("finish")
      
      store.setFinish(true);
    }
  }, 1000);
}

const pulse = computed(() => {
  if (count.value == 0)
    return ""
  if (count.value <= 10)
    return "pulse1s"
  if (count.value <= 30)
    return "pulse2s"
  if (count.value <= 60)
    return "pulse3s"
})


watch(action, (value) => {
  if (value == 'stop') {
    // count.value = initTime
    console.log("stop")
    return;
  }
  if (value == 'reset') {
    store.setFinish(false);
    clearInterval(interval);
    store.setFinishTime(count.value)
    // count.value = initTime;
    return;
  }
  if (value == 'start') {
    store.setFinish(false);
    countDown();
    return;
  }
})


</script>

<template>
  <div class="circle-timer pulse" :class="[pulse]">
    <span class="time">{{ count }}</span>
    <!-- <span class="sec">Segundos</span> -->
  </div>
</template>

<style scoped>
.circle-timer {
  display: flex;
  
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border: solid 2px #c485fe;
  border-radius: 50%;
}

.time {
  font-size: 50px;
}


.pulse {  
  box-shadow: 0 0 0 0 #c485fe;

}

.pulse1s {
  animation: pulse 1s infinite;
}

.pulse2s {
  animation: pulse 2s infinite;
}

.pulse3s {
  animation: pulse 3s infinite;
}

.pulse:hover {
  animation: none;
}

@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 #c485fe;
  }

  70% {
    -webkit-box-shadow: 0 0 0 20px rgba(204, 169, 44, 0);
  }

  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
  }
}

@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 #c485fe;
    box-shadow: 0 0 0 0 #c485fe;
  }

  70% {
    -moz-box-shadow: 0 0 0 20px rgba(204, 169, 44, 0);
    box-shadow: 0 0 0 20px rgba(204, 169, 44, 0);
  }

  100% {
    -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
    box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
  }
}

@media ((min-width: 601px) and (max-width: 960px)) {
  .header {}

  .circle-timer {
    width: 40px;
    height: 40px;
  }

  .time {
    font-size: 25px;
  }

  .sec {
    display: none;
  }
}
</style>

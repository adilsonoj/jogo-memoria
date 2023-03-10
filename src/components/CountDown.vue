<script setup>
import { ref, computed } from '@vue/reactivity'
import { watch } from 'vue';
import { useCountDown } from "../store"
import { storeToRefs } from 'pinia'

defineProps({
  stop: {
    type: Boolean,
    default: false,
  },
})

const store = useCountDown();
const { reset, action } = storeToRefs(store)
const initTime = 20;


const emit = defineEmits(['finish'])
let interval = null;

const count = ref(initTime)
const countDown = () => {
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

watch(reset, (value) => {
  console.log("listen winner")
  if (value) {
    clearInterval(interval);
    count.value = initTime

  }
})

watch(action, (value) => {
  if (value == 'stop') {
    count.value = initTime
    return;
  }
  if (value == 'reset') {
    store.setFinish(false);
    clearInterval(interval);
    count.value = initTime;
    return;
  }
  if (value == 'start') {
    // store.setFinish(false);
    countDown();
    return;
  }
})


</script>

<template>
  <div class="circle-timer pulse" :class="[pulse]">
    <span class="time">{{ count || initTime }}</span>
    <span>Segundos</span>
  </div>
</template>

<style scoped>
.circle-timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 110px;
  height: 110px;
  border: solid 2px rgba(44, 204, 196, 0.4);
  border-radius: 50%;
}

.time {
  font-size: 50px;
}


.pulse {
  box-shadow: 0 0 0 rgba(44, 204, 196, 0.4);

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
    -webkit-box-shadow: 0 0 0 0 rgba(44, 204, 196, 0.4);
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
    -moz-box-shadow: 0 0 0 0 rgba(44, 204, 196, 0.4);
    box-shadow: 0 0 0 0 rgba(44, 204, 196, 0.4);
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
</style>

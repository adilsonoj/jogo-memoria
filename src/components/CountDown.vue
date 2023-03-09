<script setup>
import { ref, computed } from '@vue/reactivity'

defineProps({
  msg: String,
})

const emit = defineEmits(['finish'])

const count = ref(60)
const countDown = () => {
  var x = setInterval(function () {
    --count.value

    if (count.value == 0) {
      clearInterval(x);
      console.log("finish")
      emit("finish");
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

countDown();
</script>

<template>
  <div class="circle-timer pulse" :class="[pulse]">
    <span class="time">{{ count }}</span>
    <span>Segundos</span>
  </div>
</template>

<style scoped>
.circle-timer {
  display: flex;
  flex-direction: column;
  width: 110px;
  height: 110px;
  border: solid 2px rgba(44, 204, 196, 0.4);
  border-radius: 50%;

  /* box-shadow: 0 0 0 rgba(44, 204, 196, 0.4); */
  /* animation: pulse 2s infinite; */
}

.time {
  font-size: 50px;
}


.pulse {
  margin: 100px;
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

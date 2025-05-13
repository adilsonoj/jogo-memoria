import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCountDown = defineStore('counter', () => {
  const reset = ref(false)
  const action = ref('stop')
  const finish = ref(false)
  const loser = ref(false)
  const cardStatus = ref('')
  const finishTime = ref()
  const initTime = ref(0)

  // const doubleCount = computed(() => count.value * 2)
  const resetar = (val) => {
    reset.value = val
  }

  const setAction = (val) => {
    if (val == 'start') {
      reset.value = false;
      finish.value = false;
      loser.value = false;
    }
    action.value = val
  }

  const setFinish = (val) => {
    if (val) {
      action.value = 'stop'
    }
    finish.value = val
  }

  const setCardStatus = (val) => {
    cardStatus.value = val
  }

  const setLoser = () => {
    action.value = 'stop'
    loser.value = true;
  }

  const setFinishTime = (val) => {
    finishTime.value = val
  }

  const setInitTime = (val) => {
    initTime.value = val
  }

  return {
    resetar,
    reset,
    setAction,
    action,
    finish,
    setFinish,
    setLoser,
    loser,
    cardStatus,
    setCardStatus,
    setFinishTime,
    finishTime,
    setInitTime,
    initTime
  }
})
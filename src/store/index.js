import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCountDown = defineStore('counter', () => {
  const reset = ref(false)
  const action = ref('stop')
  const finish = ref(false)

  // const doubleCount = computed(() => count.value * 2)
  const resetar = (val) => {
    reset.value = val
  }

  const setAction = (val) => {
    if (val == 'start') {
      reset.value = false;
      finish.value = false;
    }
    action.value = val
  }

  const setFinish = (val) => {
    if (val) {
      action.value = 'stop'
    }
    finish.value = val
  }

  return { resetar, reset, setAction, action, finish, setFinish }
})
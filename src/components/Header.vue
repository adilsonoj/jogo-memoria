<template>
  <header>
    <CountDown />
    <button @click="store.setAction('start')">INICIAR</button>
  </header>
</template>
<script setup>
import CountDown from './CountDown.vue'
import { useCountDown } from "../store"
const store = useCountDown();
</script>
<style scoped>
header {
  width: 100%;
  padding: 15px;
  border-bottom: solid 1px grey;
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
}
</style>
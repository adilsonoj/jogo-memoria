<script setup>
import { ref } from 'vue';
import Head from './components/Header.vue'
import Game from './components/Game.vue'

const stop = ref(false)
const winner = () => {
  stop.value = true
  console.log('emit winner')
}
</script>

<template>
  <Head />
  <Game />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<script setup>
import { ref, onMounted } from 'vue';
import Heade from './components/Header.vue'
import Game from './components/Game.vue'
import NotFound from './pages/404.vue'
const logo = ref('')
const payload = ref(null)
const notFound = ref(false)

const fetchConfig = async () => {
  console.log("listando")
    const urlParams = new URLSearchParams(window.location.search);
    const event = urlParams.get('event');

    if (!event) {
      console.error('Event parameter is required');
      return;
    }

    const response = await fetch(`https://eventplay-api.vp1.b4sis.com.br/games/config/${event}`);


    if (response.status === 404) {
      notFound.value = true;
      return;
    }

    const data = await response.json();

    logo.value = data.logo;
    
    payload.value = data;

  }

onMounted(() => {
  fetchConfig();
})
</script>

<template>
  <div v-if="notFound">
    <NotFound />
  </div>
  <div v-else>
    <Heade v-if="payload" :logo="logo" :time="payload.timer"/>
    <Game class="game" :payload="payload" v-if="payload"/>
    <div class="loading" v-if="!payload">Carregando...</div>
  </div>
   
  </template>

<style>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: #666;
}
</style>
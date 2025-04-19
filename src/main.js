import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { Vue3Lottie } from 'vue3-lottie'

const pinia = createPinia()
const app = createApp(App);

app.use(pinia)
app.component('Vue3Lottie', Vue3Lottie)
app.mount('#app')

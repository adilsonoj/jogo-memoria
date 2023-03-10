import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import LottieAnimation from 'lottie-web-vue'

const pinia = createPinia()
const app = createApp(App);

app.use(pinia)
app.use(LottieAnimation)
app.mount('#app')

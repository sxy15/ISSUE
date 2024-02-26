import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import microApp from '@micro-zoe/micro-app'

createApp(App).mount('#app')

microApp.start()

import './assets/main.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Search from './components/pages/Search.vue'
import Popular from './components/pages/Popular.vue'
import Single from './components/pages/Single.vue'

const router = createRouter({
    history:createWebHistory(),
    routes:[
    {
        name:'Search',
        path:'/',
        component:Search
    },
    {
        name:'Popular',
        path:'/popular',
        component:Popular
    },
    {
        name:'Single',
        path:'/single/:id(\\d+)', // (\\d+) - Правило что в url должны быть только цифры
        component:Single
    }

    ]
})

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app')

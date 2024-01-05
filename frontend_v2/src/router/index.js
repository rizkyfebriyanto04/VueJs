//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'home.index',
        component: () => import( /* webpackChunkName: "home.index" */ '@/views/home/Index.vue')
    },
    {
        path: '/create',
        name: 'home.create',
        component: () => import( /* webpackChunkName: "home.create" */ '@/views/home/Create.vue')
    },
    {
        path: '/edit/:id',
        name: 'home.edit',
        component: () => import( /* webpackChunkName: "home.edit" */ '@/views/home/Edit.vue')
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes  // config routes
})

export default router
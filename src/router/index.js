import { createRouter, createWebHistory } from 'vue-router'
import PowerView from '@/views/power-view'

const routes = [
  {
    path: '/',
    name: 'powerView',
    component: PowerView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

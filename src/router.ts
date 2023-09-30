import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Home from '@/screens/Home.vue'
import Services from '@/screens/Services.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
  },
  {
    name: 'services',
    path: '/services',
    component: Services,
    meta: {
      transition: 'slide-left',
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

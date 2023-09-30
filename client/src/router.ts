import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Home from '@/screens/Home.vue'
import Services from '@/screens/Services.vue'
import Rooms from '@/screens/Rooms.vue'
import Room from '@/screens/Room.vue'

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
    },
  },
  {
    path: '/rooms/:hotelId',
    component: Rooms,
    props: route => ({
      hotelId: String(route.params.hotelId),
    }),
    meta: {
      transition: 'slide-left',
    },
  },
  {
    path: '/room/:hotelId/:roomId',
    component: Room,
    props: route => ({
      hotelId: String(route.params.hotelId),
      roomId: String(route.params.roomId),
    }),
    meta: {
      transition: 'slide-left',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

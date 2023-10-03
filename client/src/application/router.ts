import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Home from '@/presentation/screens/Home.vue'
import Services from '@/presentation/screens/Services.vue'
import Rooms from '@/presentation/screens/Rooms.vue'
import Room from '@/presentation/screens/Room.vue'
import Location from '@/presentation/screens/Location.vue'

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
    path: '/location',
    component: Location,
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

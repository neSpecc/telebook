import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Home from '@/presentation/screens/Home.vue'
import Services from '@/presentation/screens/Services.vue'
import Hotel from '@/presentation/screens/Hotel.vue'
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
    path: '/hotel/:id',
    component: Hotel,
    props: route => ({
      id: parseInt(route.params.id as string, 10),
    }),
    meta: {
      transition: 'slide-left',
    },
  },
  {
    path: '/room/:hotelId/:roomId',
    component: Room,
    props: route => ({
      hotelId: parseInt(route.params.hotelId as string, 10),
      roomId: parseInt(route.params.roomId as string, 10),
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

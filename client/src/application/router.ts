import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Home from '@/presentation/screens/Home.vue'
import Hotel from '@/presentation/screens/Hotel.vue'
import Room from '@/presentation/screens/Room.vue'
import Location from '@/presentation/screens/Location.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/location',
    component: Location,
  },
  {
    path: '/hotel/:id',
    component: Hotel,
    props: route => ({
      id: parseInt(route.params.id as string, 10),
    }),
  },
  {
    path: '/room/:hotelId/:roomId',
    component: Room,
    props: route => ({
      hotelId: parseInt(route.params.hotelId as string, 10),
      roomId: parseInt(route.params.roomId as string, 10),
    }),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

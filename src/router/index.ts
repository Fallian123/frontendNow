import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/session/:id',
      name: 'session',
      component: () => import('@/views/SessionDetailView.vue'),
      props: true,
    },
    {
      path: '/mein-programm',
      name: 'my-schedule',
      component: () => import('@/views/MyScheduleView.vue'),
    },
  ],
})

export default router

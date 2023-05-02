import { createRouter, createWebHistory } from 'vue-router'
import ToDoList from '../views/ToDoListView.vue'
import BooksDashboard from '@/views/BooksDashboardView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'home',
      component:ToDoList,

    },
    {
      path:'/books',
      name:'books',
      component: BooksDashboard
    }
  ]
})

export default router

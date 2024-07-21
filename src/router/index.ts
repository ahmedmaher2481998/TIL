import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateBlogPost from '@/views/CreateBlogPost.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }, {
      path: "/new",
      name: "new",
      component: CreateBlogPost
    }

  ]
})

export default router

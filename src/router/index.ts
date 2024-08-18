import { createRouter, createWebHistory } from 'vue-router'
import { CreateBlogPostView, HomeView, SingleBlogPost } from '@/views'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: HomeView
    },
    {
      path: '/new',
      name: 'createNewBlogPostPage',
      component: CreateBlogPostView
    },
    {
      path: '/blog/:id',
      name: 'singleBlogPostPage',
      component: SingleBlogPost
    }
  ]
})

export default router

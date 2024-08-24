import { createRouter, createWebHistory } from 'vue-router'
import { CreateBlogPostView, DisplayBlogsWithTag, HomeView, SingleBlogPost } from '@/views'

export const enum Routes {
  DisplayBlogsWithTag = 'DisplayBlogsWithTag',
  home = 'homePage',
  createNewBlogPostPage = 'createNewBlogPostPage',
  singleBlogPostPage = 'singleBlogPostPage'
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: Routes.home,
      component: HomeView
    },
    {
      path: '/new',
      name: Routes.createNewBlogPostPage,
      component: CreateBlogPostView
    },
    {
      path: '/blog/:slug',
      name: Routes.singleBlogPostPage,
      component: SingleBlogPost
    },
    {
      path: '/tags/:tagSlug',
      name: Routes.DisplayBlogsWithTag,
      component: DisplayBlogsWithTag
    }
  ]
})

export default router

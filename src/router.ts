import { createRouter, createWebHistory } from 'vue-router'
import { CreateBlogPostView, DisplayBlogsWithTag, HomeView, NotFound, SingleBlogPost, ViewAllBlogPosts, MyAccount, ViewAuthorBlogs } from '@/views'

export const enum Routes {
  myAccount = 'my-account',
  DisplayBlogsWithTag = 'DisplayBlogsWithTag',
  home = 'homePage',
  createNewBlogPostPage = 'createNewBlogPostPage',
  ViewAllBlogPosts = 'ViewAllBlogPosts',
  singleBlogPostPage = 'singleBlogPostPage',
  notFound = 'notFound',
  ViewAuthorBlogs = "ViewAuthorBlogs"
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: Routes.myAccount,
      path: '/my-account',
      component: MyAccount
    }, {
      name: Routes.ViewAuthorBlogs,
      path: '/author/:id',
      component: ViewAuthorBlogs
    },
    {
      path: '/new',
      name: Routes.createNewBlogPostPage,
      component: CreateBlogPostView
    },
    {
      path: '/blog/',
      name: Routes.ViewAllBlogPosts,
      component: ViewAllBlogPosts
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
    },
    {
      path: '/',
      name: Routes.home,
      component: HomeView
    },
    {
      path: '/:pathMatch(.*)*',
      name: Routes.notFound,
      component: NotFound// lazy load 404 page
    }
  ], scrollBehavior() {

    return { top: 0, left: 0 }
  }
})

export default router

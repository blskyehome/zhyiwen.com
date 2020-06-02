import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Admin from '@/views/Admin.vue'
import AdminIndex from '@/views/admin/Index.vue'
import AdminLinkList from '@/views/admin/LinkList.vue'
import AdminHotSort from '@/views/admin/HotSort.vue'
import AdminCategory from '@/views/admin/Category.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    redirect: 'admin/aindex',
    children: [
      {
        path: 'aindex',
        name: 'aindex',
        component: AdminIndex
      },
      {
        path: 'alinklist',
        name: 'alinklist',
        component: AdminLinkList
      },
      {
        path: 'ahotsort',
        name: 'ahotsort',
        component: AdminHotSort
      },
      {
        path: 'acategory',
        name: 'acategory',
        component: AdminCategory
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

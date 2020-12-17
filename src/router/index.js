import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
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
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    redirect: 'admin/aindex',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'aindex',
        name: 'aindex',
        component: AdminIndex,
        meta: { requiresAuth: true }
      },
      {
        path: 'alinklist',
        name: 'alinklist',
        component: AdminLinkList,
        meta: { requiresAuth: true }
      },
      {
        path: 'ahotsort',
        name: 'ahotsort',
        component: AdminHotSort,
        meta: { requiresAuth: true }
      },
      {
        path: 'acategory',
        name: 'acategory',
        component: AdminCategory,
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

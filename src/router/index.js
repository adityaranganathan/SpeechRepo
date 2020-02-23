import Vue from 'vue'
import VueRouter from 'vue-router'
import Speech from '../views/Speech.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:"/speech/all"
  },
  {
    path: '/speech',
    name: 'Speech',
    component: Speech,
    children: [
      {
        path:'all',
        component:() => import(/* webpackChunkName: "AllSpeech" */ '../views/AllSpeech.vue')
      },
      {
        path:"my",
        component:() => import(/* webpackChunkName: "MySpeech" */ '../views/MySpeech.vue')
      }
    ]
  },
  {
    path: '/editor/:id',
    name: 'Editor',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "editor" */ '../views/Editor.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

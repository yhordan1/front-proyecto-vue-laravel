import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VistaLogin from  '../views/LoginView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {requireAuth: true}
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {requireAuth: true}
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import('../views/LoginView.vue')
      component: VistaLogin,
      meta: {redirectIfAuth: true}
    }
  ]
})

//aplicacion de guard guardia de rutas
// guard
router.beforeEach((to, from, next) =>{
  let token = localStorage.getItem("access_token")

  
  if(to.meta.requireAuth){
    if(!token)
      return next({name: 'login'});
    return next()
  }
  if(to.meta.redirectIfAuth && token){
    return next({name: 'about'})
  }
  next()
})

export default router

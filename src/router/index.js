import VueRouter from 'vue-router'
import Vue from 'vue'
import post from './modules/post'
import Register from '../view/auth/Register'
import Login from '../view/auth/Login'
import Email from '../view/auth/Email'
import store from '../store'
import profile from './modules/profile'
import Messages from '../components/Messages'
import OfferMessages from '../view/messages/OfferMessages'
import NeedMessages from '../view/messages/NeedMessages'

Vue.use(VueRouter)

const router = new VueRouter({
    mode:'history',
    routes:[
        ...post,
        ...profile,
        {
            path: '/register',
            component: Register,
            name: 'Register',
            beforeEnter: (to, from, next) => {
                if(to.name === 'Register' && store.getters.isLoggedIn){
                    return next('/')
                }else{
                    return next()
                }
            }
        },
        {
            path: '/login',
            component: Login,
            name: 'Login',
            beforeEnter: (to, from, next) => {
                if(to.name === 'Login' && store.getters.isLoggedIn){
                    return next('/')
                }else{
                    return next()
                }
            }

        },
        {
            path: '/forgot-password',
            component: Email,
            name: 'Forgot Password'
        },
        {
            path : '/messages',
            component: Messages,
            name: 'Messages',
            meta: {
                requiresAuth: true
              },
            children:[
                {
                    path: '/messages',
                    component: OfferMessages,
                    name: 'OfferMessages'
                },
                {
                    path: '/need-messages',
                    component: NeedMessages,
                    name: 'NeedMessages'
                },
            ]
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!store.getters.isLoggedIn) {
        next({ name: 'Login' })
      } else {
        next() // go to wherever I'm going
      }
    } else {
      next() // does not require auth, make sure to always call next()!
    }
  })


export default router;
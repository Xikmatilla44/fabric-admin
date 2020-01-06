import Vue from 'vue';
import Router from 'vue-router';

import Home from '../components/Home'
//import Login from '../components/Login'
import BLogin from '../components/BLogin'
import GoogleKeep from '../components/googleKeep'
import Invoice from '../components/Invoice'
import Act from '../components/Act'
import Menu from '../components/Menu'
import BRegister from '../components/BRegister'
//import { TokenService } from '../_services/storage.service';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/home', component: Home,
    children: [
      { path: '/invoice', component: Invoice },
      { path: '/act', component: Act }
      ]
    },

    { path: '/login', component: BLogin },        
    { path: '/blogin', component: BLogin },    
    { path: '/register', component: BRegister },
    { path: '/googleKeep', component: GoogleKeep},
    { path: '/menu', component: Menu },
    { path: '*', redirect: '/login' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register', '/blogin' ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user'); //TokenService.getToken();

  if (authRequired && !loggedIn) {
    return next('/login');    
  }

  next();
})


// router.beforeEach((to, from, next) => {
//   const isPublic = to.matched.some(record => record.meta.public)
//   const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
//   const loggedIn = !!TokenService.getToken();

//   if (!isPublic && !loggedIn) {
//     return next({
//       path:'/login',
//       query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
//     });
//   }

//   // Do not allow user to visit login page or register page if they are logged in
//   if (loggedIn && onlyWhenLoggedOut) {
//     return next('/')
//   }

//   next();
// })

export default router;

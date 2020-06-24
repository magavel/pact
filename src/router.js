import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Initialisation from "./components/projects/Initialisation";
import BoardControleSaisieUser from "./views/BoardControleSaisieUser";
import store from './store'

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  //console.log('!store.getters.isAuthenticated', !store.getters.isAuthenticated);
  console.log('user : ', store.state.auth.user);
  /*if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')*/
  if(store.state.auth.user === null){
    next()
    return
  }
  next('/login')
}

const ifAuthenticated = (to, from, next) => {
  console.log('user : ', store.state.auth.user);
  /*if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')*/
  if(store.state.auth.user !== null){
    next()
    return
  }
  next('/login')
}


export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      //component: Home,
      component: Login,
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/UpdatePassword',
      name: 'UpdatePassword',
      component: () => import('./views/UpdatePassword.vue'),
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('./views/BoardAdmin.vue'),
    },
    {
      path: '/mod',
      name: 'moderator',
      // lazy-loaded
      component: () => import('./views/BoardModerator.vue'),
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue'),
    },
    {
      path: '/controleUser',
      name: 'BoardControleSaisieUser',
      // lazy-loaded
      component: () => import('./views/BoardControleSaisieUser'),
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/activites',
      name: 'activites',
      beforeEnter: ifAuthenticated,
      // lazy-loaded
      component: () => import('./views/BoardUserSaisie.vue'),

      children: [
        {
          path: 'ajoutActiviteControle',
          name: 'ajoutActiviteControle',
          component: () => import('./views/BoardControleSaisieUser'),
        },
        {
          path: 'myActivities',
          name: 'myActivities',
          component: () => import('./components/saisies/MyActivities'),
          children:[
            {
              path: 'periodeListing',
              name: 'periodeListing',
              component: () => import('./components/saisies/inputByWeekly'),
            },
            {
              path: 'dailyListing',
              name: 'dailyListing',
              component: () => import('./components/saisies/DailyListing'),
            },
          ]
        }

      ]
    },
    {
      path: '/projects',
      // name: 'projects',
      // lazy-loaded
      component: () => import('./views/BoardProject.vue'),
      beforeEnter: ifAuthenticated,
      children: [
        {
          path: '',
          component: () => import('./components/projects/CreateProjectForm')
        },
        {
          path: 'besoins/:systemeInformationId?',
          name: 'besoins',
          component: () => import('./components/projects/Besoins')
        },
        {
          path: 'equipe',
          name: 'equipe',
          component: () => import('./components/projects/Equipe')
        },


       {
        path: 'planification',
        name: 'planification',
        component: () => import('./components/projects/Planification')
      },
      ]
    },
    //{ path: '*', component: NotFoundComponent }
  ],
});

export default router;



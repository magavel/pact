import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Initialisation from "./components/projects/Initialisation";

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/login',
      component: Login,
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
      path: '/activites',
      name: 'activites',
      // lazy-loaded
      component: () => import('./views/BoardUserSaisieTest.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      // lazy-loaded
      component: () => import('./views/BoardProject.vue'),
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
  ],
});

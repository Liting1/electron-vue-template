import NotFound from '@render/views/Error.vue';

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: null
  },
  {
    name: 'home',
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ '@render/views/Home.vue')
  },
  {
    name: 'demo',
    path: '/demo',
    component: () => import(/* webpackChunkName: "demo" */ '@render/views/Demo.vue')
  },
  {
    name: 'path',
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@render/views/Login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
];

export default routes;

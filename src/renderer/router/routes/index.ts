import Home from '@render/views/Home.vue';
import Login from '@render/views/Login.vue';
import Demo from '@render/views/Demo.vue';

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: null
  },
  {
    name: 'home',
    path: '/home',
    component: Home
  },
  {
    name: 'demo',
    path: '/demo',
    component: Demo
  },
  {
    name: 'path',
    path: '/login',
    component: Login
  }
];

export default routes;

// import { RouterOptions } from 'Vue-router';
import Home from '@render/views/Home.vue';
import Login from '@render/views/Login.vue';

const routes = [{
  path: '/',
  redirect: 'home',
  component: null
}, {
  name: 'home',
  path: '/home',
  component: Home
}, {
  name: 'path',
  path: '/login',
  component: Login
}];

export default routes;


import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';

export default [{
  path: '/',
  redirect: 'home'
}, {
  name: 'home',
  path: '/home',
  component: Home
}, {
  name: 'path',
  path: '/login',
  component: Login
}];

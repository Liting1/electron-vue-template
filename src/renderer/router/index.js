import VueRouter from 'vue-router';
import routes from './routes';
import Vue from 'vue';

Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

export default router;

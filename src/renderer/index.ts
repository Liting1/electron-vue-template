
import * as Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import regEvent from './event/regEvent';
const app = Vue.createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
// regEvent.init(app);

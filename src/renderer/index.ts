
import * as Vue from 'vue';
import App from './App.vue';

Vue.createApp(App).mount('#app');

// import store from './store';
// import router from './router';
// import ipcRenderHandle from './event';
// import regEvent from './event/regEvent';
// import 'view-design/dist/styles/iview.css';
// import {
//   Button,
//   Table,
//   Icon,
//   Modal
// } from 'view-design';
// Vue.component('Button', Button);
// Vue.component('Table', Table);
// Vue.component('Icon', Icon);
// Vue.component('Modal', Modal);
//
// // 触发主进程的自定义事件
// Vue.prototype.$ev = ipcRenderHandle;
//
// // 定义环境变量, 由webpack 配置定义
// Vue.prototype.$env = {
//   NODE_ENV, // node环境
//   MODE, // 所处环境
//   VERSION // 当前版本
// };

// const app = new Vue({
//   store,
//   router,
//   render: h => h(App)
// }).$mount('#app');
//
// // 注册渲染进程事件
// regEvent.init(app);

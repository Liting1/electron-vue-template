
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

// import ipcRenderHandle from './event';
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

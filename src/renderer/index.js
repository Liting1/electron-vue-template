/*
 * @Author: your name
 * @Date: 2020-10-21 22:30:09
 * @LastEditTime: 2020-12-27 12:10:50
 * @LastEditors: Please set LastEditors
 * @Description: 渲染线程入口文件
 * @FilePath: \electron-vue-template\src\renderer\index.js
 */
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import event from './event';
import regEvent from './event/regevent';
import 'view-design/dist/styles/iview.css';
import {
	Button,
	Table,
	Icon
} from 'view-design';
Vue.component('Button', Button);
Vue.component('Table', Table);
Vue.component('Icon', Icon);

// 触发主进程的自定义事件
Vue.prototype.$ev = event;
// 注册事件
regEvent.init();

// 定义环境变量
Vue.prototype.$env = {
	NODE_ENV,	// node环境
	MODE,		// 所处环境
	VERSION, 	// 当前版本
};



let app = new Vue({
	store,
	router,
	render: h => h(App)
}).$mount("#app");

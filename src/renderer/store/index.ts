import * as Vuex from 'vuex';
import baseModule from './baseModule';
import userModule from './userModule';

const store = Vuex.createStore({
  strict: true, // 启用严格 vuex 严格模式
  modules: {
    baseData: baseModule,
    userInfo: userModule
  }
});

export default store;

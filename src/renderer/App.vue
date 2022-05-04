<template>
  <img alt="Vue logo" src="./assets/images/vue.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <div>
    <button @click="handleClick">点击发送请求</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import { getUserInfo } from '@render/api';
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    handleClick () {
      getUserInfo().then(res => {
        console.log('res:', res);
      }).catch(err => {
        console.log('err:', err);
      });
      console.log(123);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div>
<!--    <router-view />-->
    <h2 class="title">Vue3 Hello world</h2>
    <p>{{getData}} 2.0.6 version</p>
    <ul>
      <li>哈哈哈哈哦</li>
    </ul>
<!--    <img :src="require('@/static/img/bg.jpg')" alt="">-->
  </div>
</template>

<script lang="ts">
// import Nav from './components/Nav';

export default {
  setup () {},
  data () {
    return {
      a: 123
    };
  },
  computed: {
    getData () {
      if (this.a?.b) {
        return 6666;
      }
      return 6666;
    }
  }
};
</script>

<style scoped lang="sass">
.title
  color: red
  //background: url("@/static/img/bg.jpg")
</style>

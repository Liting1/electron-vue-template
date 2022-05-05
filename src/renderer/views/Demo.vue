<template>
  <div class="demo">
    <button class="btn btn-success">打开一个新的窗口</button>
    <button class="btn btn-success" @click="handleClick">发送请求</button>
  </div>
</template>

<script>
import { getUserInfo } from '@render/api';

export default {
  name: 'Demo',
  methods: {
    async handleClick() {
      const res = await getUserInfo();
      console.log('res:', res);
    }
  }
};
</script>

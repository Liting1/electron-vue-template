<template>
  <div class="demo">
    <button class="btn btn-success" @click="handleOpen">打开一个新的窗口</button>
    <button class="btn btn-success" @click="handleClick">发送请求</button>
    <button class="btn btn-info" @click="handleNotice">点击通知</button>
  </div>
</template>

<script lang="ts">
import { getUserInfo } from '@render/api';
export default {
  name: 'Demo',
  methods: {
    /**
     * 发送请求
     */
    async handleClick() {
      const res = await getUserInfo();
      console.log('res:', res);
    },
    /**
     * 系统通知
     */
    handleNotice() {
      if (window.electronAPI) {
        window.electronAPI.showNotification('Hello MT', new Date().toDateString());
      }
    },
    /**
     * 打开窗口
     */
    handleOpen() {
      if (window.electronAPI) {
        window.electronAPI.openViewWin();
      }
    }
  }
};
</script>

<style scoped lang="sass">
.btn
  margin-right: 10px
</style>

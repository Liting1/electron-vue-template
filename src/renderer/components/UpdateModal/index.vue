<template>
  <div class="update-modal">
    <h3>应用更新</h3>
    <p>{{ modalData.msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'UpdateModal',
  props: ['modalData'],
  methods: {
    handleOk() {
      // 调用下载
      if (this.modalData.status === 1) {
        this.$ev.downloadApp();
      }
      console.log('ok');
    }
  }
};
</script>

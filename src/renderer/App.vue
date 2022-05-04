<template>
  <div class="app-container">
    <TabBar />
    <router-view class="content" />
  </div>
</template>

<script>
import TabBar from '@/renderer/components/TabBar';
export default {
  name: 'App',
  components: {
    TabBar
  }
};
</script>

<style scoped lang="sass">
.app-container
  height: 100vh
  overflow: hidden
  display: flex
  .content
    flex: 9
</style>

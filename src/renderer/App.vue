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
  display: flex
  height: 100vh
  overflow: hidden

  .content
    flex: 9
</style>

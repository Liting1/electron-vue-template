<template>
  <div class="nav-container drag">
    <Control />
  </div>
</template>

<script>
import Control from './Control';
export default {
  name: 'Nav',
  components: {
    Control
  }
};
</script>

<style scoped lang="sass">
.nav-container
  width: 100%
  height: 28px
  border-bottom: 1px solid #ccc
</style>

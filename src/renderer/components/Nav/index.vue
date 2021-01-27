<template>
<div class="nav-container drag">
  <span><Icon type="ios-checkmark" /></span>
  <span>66666</span>

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
  height: 28px
  width: 100%
  border-bottom: 1px solid #ccc
</style>

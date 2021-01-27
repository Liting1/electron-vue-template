<template>
<div class="control no-drag">
  <div class="min"></div>
  <div class="max"></div>
  <div class="close"><Icon type="ios-close" size="24" /></div>
</div>
</template>

<script>
export default {
  name: 'Control'
};
</script>

<style scoped lang="sass">
.control
  position: absolute
  right: 0
  top: 0
  height: 27px
  display: flex
  >div
    width: 48px
    height: 100%
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    &:hover
      background-color: #eeeeee
</style>

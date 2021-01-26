<template>
<<<<<<< HEAD:src/renderer/components/Nav.vue
  <div class="nav-container">
    <span><Icon type="ios-checkmark" /></span>
    <span>66666</span>
  </div>
=======
<div class="nav-container drag">
  <span><Icon type="ios-checkmark" /></span>
  <span>66666</span>

  <Control />
</div>
>>>>>>> temp:src/renderer/components/Nav/index.vue
</template>

<script>
import Control from "./Control";
export default {
<<<<<<< HEAD:src/renderer/components/Nav.vue
  name: 'Nav'
};
=======
  name: "Nav",
  components: {
    Control,
  }
}
>>>>>>> temp:src/renderer/components/Nav/index.vue
</script>

<style scoped lang="sass">
.nav-container
  height: 28px
  width: 100%
  border-bottom: 1px solid #ccc
</style>

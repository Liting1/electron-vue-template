<template>
  <div class="control no-drag">
    <div class="min" @mousemove="addClassName($event)" @mouseleave="removeClassName($event)" @click="minimize($event)">
      <Icon type="ios-remove" size="24" color="#aaa" />
    </div>

    <div class="max" @mousemove="addClassName($event)" @mouseleave="removeClassName($event)" @click="handleMax">
      <Icon v-if="isMax" type="ios-browsers-outline" color="#000" />
      <Icon v-else type="ios-square-outline" size="14" color="#000" />
    </div>
    <div class="close" @click="handleClose"><Icon class="ios-close" type="ios-close" size="24" /></div>
  </div>
</template>

<script>
export default {
  name: 'Control',
  data() {
    return {
      isMax: false
    };
  },
  methods: {
    handleMax() {
      this.isMax = !this.isMax;
      this.$ev.maximizeMainWin();
    },
    addClassName(ele) {
      ele.currentTarget.classList.add('hover-color');
    },
    removeClassName(ele) {
      ele.currentTarget.classList.remove('hover-color');
    },
    handleClose() {
      this.$ev.closeWin();
    },
    minimize(ele) {
      this.removeClassName(ele);
      this.$ev.minimizeMainWin();
    }
  }
};
</script>

<style scoped lang="sass">
.control
  position: absolute
  top: 0
  right: 0
  display: flex
  height: 27px

  >div
    display: flex
    align-items: center
    justify-content: center
    width: 48px
    height: 100%
    cursor: pointer

  .close:hover
    background-color: red

    .ios-close
      color: #fff

  .hover-color
    background-color: #eee
</style>

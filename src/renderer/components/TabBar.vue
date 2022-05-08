<template>
  <div class="tab-bar">
    <ul class="nav nav-pills nav-stacked">
      <li role="presentation"><router-link to="/home">首页</router-link></li>
      <li role="presentation"><router-link to="/demo">基础演示</router-link></li>
      <li role="presentation"><router-link to="/NotFound">NotFound</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
};
</script>

<style scoped lang="sass">
.tab-bar
  flex: 1
  border-right: 1px solid #ccc
</style>

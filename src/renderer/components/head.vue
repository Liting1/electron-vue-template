<template>
  <div class="header">
    <ul>
      <li v-for="item in goodsList" :key="item.id">
        <span>{{ item.name }}</span>
        <span>{{ item.price }}</span>
      </li>
    </ul>
    <img src="@render/assets/images/vue.png" width="200" alt="" />
    <img :src="imgUrl" />
    <div class="img"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgUrl: require('@/assets/images/result.png'),
      goodsList: [
        {
          id: 1,
          name: '香蕉',
          price: 5
        },
        {
          id: 2,
          name: '苹果',
          price: 3
        },
        {
          id: 3,
          name: '梨子',
          price: 8
        }
      ]
    };
  },
  methods: {
    clickHandler() {
      for (let i = 0; i < this.goodsList.length; i++) {
        console.log(this.goodsList[i], i);
      }
    }
  }
};
</script>
<style scoped lang="sass">
.header
	ul
		li
			color: blue
			font-size: 20px

.header .img
  width: 300px
  height: 300px
  color: #666
  border: solid 1px #000
</style>

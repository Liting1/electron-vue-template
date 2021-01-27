<template>
<div class="header">
	<ul>
		<li v-for="item in goodsList" :key="item.id">
			<span>{{item.name}}</span>
			<span>{{item.price}}</span>
		</li>
	</ul>
	<img src="@/assets/images/1.jpg" width="200">
	<img :src="imgUrl">
	<div class="img"></div>
</div>
</template>
<script>
export default {
  data () {
    return {
      imgUrl: require('@/assets/images/result.png'),
      goodsList: [{
        id: 1,
        name: '香蕉',
        price: 5
      }, {
        id: 2,
        name: '苹果',
        price: 3
      }, {
        id: 3,
        name: '梨子',
        price: 8
      }]
    };
  },
  methods: {
    clickHandler () {
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
			font-size: 20px
			color: blue
.header .img
  width: 300px
  height: 300px
  border: solid 1px #000
  background: url('@/assets/images/tuite.png')
</style>

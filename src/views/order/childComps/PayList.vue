<template>
  <div class="pay">
    <div class="pay-list">
      <div class="pay-list-item" v-for="(i,index) in goods" :key="index">
        <img :src="i.pic" alt="">
        <span class="title">{{i.goods_title}}</span>
        <div class="price">￥{{i.goods_price}}</div>
        <div class="count">x{{i.goods_count}}</div>
      </div>
    </div>
    <div class="total-price">
      <div class="">商品价格：{{totalPrice}}元</div>
      <div>配送费用：0.00元</div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "PayList",
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods:{
      // totalPrice()
    },
    computed: {
      totalPrice() {
        return this.goods.reduce((pre, item) => {
          return pre + item.goods_price * item.goods_count
        }, 0).toFixed(2)
      }
    }
  }
</script>

<style scoped>
  .pay{
    letter-spacing: 1px;
  }
  .pay-list {
    border-bottom: 10px solid #eee;
  }

  .pay-list-item {
    /*height: 100px;*/
    position: relative;
    display: flex;
    justify-content: space-evenly;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }

  .title {
    display: inline-block;
    width: 200px;
    height: 32px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 10px;
  }

  .price {
    position: absolute;
    bottom: 30px;
    right: 40px;
    color: #ff4500;
  }

  .count {
    position: absolute;
    bottom: 10px;
    right: 40px;
    color: #666666;
    font-size: 14px;
  }

  .pay-list-item img {
    width: 100px;
    height: 100px;
  }

  .total-price {
    font-size: 14px;
    padding: 10px 2em;
  }
</style>

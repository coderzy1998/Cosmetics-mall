<template>
  <div class="order-bottom-bar">
    <div class="total-price">合计：{{money.toFixed(2)}}</div>
    <div class="payment">去付款</div>
  </div>
</template>

<script>
  export default {
    name: "OrderBottomBar",
    props:{
      money:{
        type:Number,
        default:0
      }
    }
  }
</script>

<style scoped>
  .order-bottom-bar{
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    position: relative;
    box-shadow: 0 -1px 1px rgba(100,100,100,0.3);
  }
  .total-price{
    flex: 2;
    background-color: #eee;
    color: var(--color-high-text);
  }
  .payment{

    color: #fff;
    background-color: var(--color-tint);
    flex: 3;
  }
</style>

<template>
  <div class="goods" @click="itemClick">
<!--    图片中的on-load属性：当图片加载完成时回调-->
    <img v-lazy="showImage" alt="" @load="ItemImageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.buy_price}}</span>
      <span class="collect">{{goodsItem.sell_count}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      showImage()
      {
        return this.goodsItem.pic || this.goodsItem.image || this.goodsItem.show.img
      },
      itemId()
      {
        return this.goodsItem.id || this.goodsItem.item_id
      }
    },
    methods:{
      ItemImageLoad()
      {
        // 往事件总线中发射事件
        this.$bus.$emit('ItemImageLoad')
      },
      itemClick()
      {
        this.$router.push('/detail/' + this.itemId)
      }
    }
  }
</script>

<style scoped>
  .goods {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>

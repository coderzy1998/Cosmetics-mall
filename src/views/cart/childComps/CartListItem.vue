<template>
  <div id="shop-item" @click="detailClick">
    <div class="item-selector">
      <CheckButton @click.native.stop="checked" :is-checked="isChecked"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="itemInfo.pic" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.goods_title}}</div>
      <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.goods_price}}</div>

        <div class="item-count right">
          <button @click.stop="sub(itemInfo)">-</button>
          x{{itemInfo.goods_count}}
          <button @click.stop="add(itemInfo)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  import {addCart,getCartList} from "../../../network/cart";

  export default {
    name: "CartListItem",
    components:{
      CheckButton
    },
    props:{
      itemInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      checked()
      {
        this.$store.commit('addId',this.itemInfo.id)
      },
      detailClick()
      {
        this.$router.push('/detail/'+ this.itemInfo.goods_id)
      },
      add(info){
        const product = {};
        product.id = info.goods_id;
        product.title = info.goods_title;
        product.price = info.goods_price;
        product.count = 1;
        product.discount = info.goods_discount;
        addCart(product).then(res =>{
          this.$bus.$emit('cartChange')
        });
      },
      sub(info){
        const product = {};
        product.id = info.goods_id;
        product.title = info.goods_title;
        product.price = info.goods_price;
        product.count = -1;
        product.discount = info.goods_discount;
        addCart(product).then(res =>{
          this.$bus.$emit('cartChange')
        });
      }
    },
    computed:{
      isChecked(){
        return this.$store.state.cartId.indexOf(this.itemInfo.id) !=-1;
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
  .item-count button{
    height: 25px;
    width: 25px;
    line-height: 25px;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 10px;
    font-size: 18px;
  }
</style>

<template>
  <div class="order">
    <nav-bar class="order-nav">
      <el-button slot="left" icon="el-icon-arrow-left" class="back-btn" @click="back"></el-button>
      <div slot="center">确认订单</div>
    </nav-bar>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            :pull-up-load="true">
      <order-user-info />
      <order-pay-type />
      <pay-list :goods="payGoods" ref="paylist" />
    </scroll>
    <order-bottom-bar :money="money" />
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import OrderUserInfo from "./childComps/OrderUserInfo";
  import OrderPayType from "./childComps/OrderPayType";
  import PayList from "./childComps/PayList";
  import OrderBottomBar from "./childComps/OrderBottomBar";

  import Scroll from "../../components/common/scroll/Scroll";

  import {getCartListById} from "../../network/cart";

  export default {
    name: "Order",
    data(){
      return {
        payGoods:[],
        money:0
      }
    },
    components:{
      NavBar,
      OrderUserInfo,
      OrderPayType,
      PayList,
      Scroll,
      OrderBottomBar
    },
    methods:{
      back(){
        this.$router.back()
      },
      _getCartListById(id){
        getCartListById(id).then(res =>{
          this.payGoods=res.data
        })
      }
    },
    computed:{
      getMoney(){
        return parseInt(this.$refs.paylist.totalPrice)
      }
    },
    created() {
      this._getCartListById(this.$route.query.cartId)
    },
    updated() {
      this.money=this.getMoney
    }
  }
</script>

<style scoped>
  .order{
    position: relative;
    background-color: #fff;
    height: 100%;
    z-index: 9;
  }
  .content{
    height: calc(100vh - 88px);
  }
  .order-nav{
    position: relative;
    background-color: var(--color-tint);
    color: #fff;
    z-index: 9;
  }
  .back-btn{
    border:0;
    color: #fff;
    background-color: var(--color-tint);
  }
</style>

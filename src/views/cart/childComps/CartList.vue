<template>
  <div class="cart-list">
    <scroll class="content" :probe-type="3" ref="scroll">
      <cart-list-item v-for="(i,index) in cartList"
                      :item-info="i"
                      :key="index">
      </cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";
  export default {
    name: "CartList",
    props:{
      cartList:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      Scroll,
      CartListItem
    },
    methods:{

    },
    computed:{

    },
    activated() {
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px - 37px)
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>

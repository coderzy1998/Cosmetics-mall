<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
      <div slot="right" @click="emptyCart">删除</div>
    </nav-bar>
    <cart-list :cartList="cartList"></cart-list>
    <cart-bottom-bar :cartID="cartId"></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {getCartList, deleteCart, addCart} from "../../network/cart";

  // vuex的一个方法，把vuex中的getters映射到组件中的computed
  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    data() {
      return {
        cartId:[],
        cartList:[]
      }
    },
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    methods: {
      emptyCart() {
        this._deleteCart(this.checkedId).then(res =>{
          this.$store.commit('emptyId');
          this._getCartList()
        })
      },
      _getCartList() {
        if (this.token){
          getCartList().then(res => {
            this.cartList=res.data;
            this.cartId=[];
            for (let i of res.data) {
              if (this.cartId.indexOf(i.id) == -1) {
                this.cartId.push(i.id)
              }
            }
          })
        }
      },
      _deleteCart(id) {
        return new Promise((resolve, reject) => {
          deleteCart(id).then(res => {
            console.log(res);
            resolve()
          })
        });
      },
    },
    computed: {
      ...mapGetters(['checkedId']),
      cartLength(){
        return this.cartList.length
      }
    },
    activated() {
      this._getCartList();
    },
    mounted() {
      this.$bus.$on('cartChange',() =>{
        this._getCartList()
      })
    }
    // deactivated() {
    //   this._deleteCart()
    // }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  #cart {
    height: 100vh;
  }
</style>

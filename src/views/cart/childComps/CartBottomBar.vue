<template>
  <div class="bottom-bar">
    <div class="checkAll">
      <check-button class="check-btn" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkedId.length}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  import {getCartListById} from "../../../network/cart";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    props: {
      cartID: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        checkedGoods: []
      }
    },
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['checkedId']),
      // totalPrice()
      // {
      //   return '￥'+ this.$store.state.cartList.filter(item => {
      //     return item.checked
      //   }).reduce((preValue,item) => {
      //     return preValue + item.price * item.count
      //   },0).toFixed(2)
      // },
      totalPrice() {
        return this.checkedGoods.reduce((pre, item) => {
          return pre + item.goods_price * item.goods_count
        }, 0).toFixed(2)
      },
      isSelectAll() {
        return this.cartID.length == this.checkedId.length
      },
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {
          this.$store.commit('notAll')
        } else {
          this.$store.commit('selectAll', this.cartID)
        }
      },
      calcClick() {
        if (this.checkedGoods.length == 0){
          this.$message({
            type:"warning",
            message:"请先添加商品",
            center:true
          })
        }else {
          this.$router.push({
            path:"/order",
            query:{
              cartId:this.checkedId
            }
          })
        }
      },
      _getCartListById(id) {
        getCartListById(id).then(res => {
          this.checkedGoods = res.data
        })
      }
    },
    watch: {
      checkedId() {
        this._getCartListById(this.checkedId)
      }
    },
    mounted() {
      this.$bus.$on('cartChange', () => {
        this._getCartListById(this.checkedId)
      })
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    background-color: #eee;
    height: 40px;
    display: flex;
    line-height: 40px;
    font-size: 14px;
  }

  .checkAll {
    display: flex;
    align-items: center;
    width: 60px;
    margin-left: 5%;
  }

  .price {
    flex: 1;
    text-align: center;
  }

  .check-btn {
    width: 20px;
    height: 20px;
    line-height: 20px;
  }

  .calculate {
    width: 80px;
    background-color: hotpink;
    color: #fff;
    border-radius: 50px;
    text-align: center;
    margin-right: 2%;
  }
</style>

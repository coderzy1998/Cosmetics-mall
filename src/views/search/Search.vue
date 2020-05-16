<template>
  <div id="search">
    <home-search @searchClick="searchClick">
      <el-button icon="el-icon-arrow-left" slot="left" class="back-btn" @click="back"></el-button>
    </home-search>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll">
      <good-list :goods="goods"></good-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSearch from "../home/childComps/HomeSearch";
  import GoodList from "../../components/content/goods/GoodList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";
  import {getSearchGoods} from "../../network/home";
  import {backTopMixin} from "../../common/mixin";

  export default {
    name: "Search",
    data() {
      return {
        goods:[]
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      searchClick(value) {
        getSearchGoods(value).then(res =>{
          this.goods=res.data
        })
      },
      contentScroll(position){
        // 判断backtop是否显示
        this.isShowBackTop=(-position.y)>700
      },

    },
    components: {
      Scroll,
      HomeSearch,
      GoodList
    },
    mixins:[backTopMixin]
  }
</script>

<style scoped>
  #search {
    position: absolute;
    z-index: 10;
    height: 100vh;
    width: 100vw;
    background-color: #fff;
  }

  .back-btn {
    border: none;
  }
  .content{
    height: calc(100vh - 38px);
  }
</style>

<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
      <el-button icon="el-icon-search"
                 class="button" circle slot="right"
                 @click="searchClick">
      </el-button>
    </nav-bar>
<!--    <home-search class="home-search" @click.native="searchClick"/>-->
    <scroll class="content" ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <good-list :goods="showGoods"></good-list>
    </scroll>
<!--    .native修饰符，在需要监听组件原生事件时使用-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  import HomeSearch from "./childComps/HomeSearch";

  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodList from "../../components/content/goods/GoodList";
  import Scroll from "../../components/common/scroll/Scroll";

  import {getHomeMultidata,getHomeGoods,getHomeRecommends} from "../../network/home";
  import {debounce} from "../../common/utils";
  import {itemLoadMixin,backTopMixin} from "../../common/mixin";

  export default {
    name: "Home",
    components:{
      HomeSearch,
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodList,
      Scroll,
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:[],
        currentType:'pop',
        tabOffsetTop:0,
        isShowTab:false,
        saveY:0,
      }
    },
    mixins:[itemLoadMixin,backTopMixin],
    created() {
      this.getHomeMultidata();
      this.getHomeGoods();
    },
    mounted(){

    },
    deactivated(){
      this.$bus.$off('ItemImageLoad',this.itemLoadMixin)
    },
    computed:{
      showGoods()
      {
        return this.goods
      }
    },
    activated()
    {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0,this.saveY,0);
    },
    beforeRouteLeave(to,from,next)
    {
      this.saveY=this.$refs.scroll.scroll.y;
      next()
    },
    methods:{
      /**
       *事件监听相关方法
       */
      swiperImgLoad(){

      },
      contentScroll(position){
        // 判断backtop是否显示
        this.isShowBackTop=(-position.y)>700
      },
      searchClick(){
        this.$router.push('/search')
      },
      /**
       * 网络请求
       */
      // 轮播图数据
      getHomeMultidata()
      {
        getHomeMultidata().then(res =>{
          this.banners=res.data
        });
        getHomeRecommends().then(res =>{
          this.recommends=res.data.data.recommend.list
        })
      },
      getHomeGoods()
      {
        getHomeGoods().then(res =>
        {
          this.goods=res.data
        })
      },
    }
  }
</script>

<style scoped>
  .home-bar{
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  #home{
    /*padding-top: 44px;*/
    position: relative;
    height: 100vh;
  }
  .content{
    /*overflow: hidden;*/
    position: absolute;
    top: 38px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
  .button{
    border:0;
    color: #fff;
    background-color: var(--color-tint);
  }
</style>

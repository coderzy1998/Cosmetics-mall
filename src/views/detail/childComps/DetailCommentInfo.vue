<template>
  <div class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more" @click="comment">
        去评论
        <i class="arrow-right"></i>
      </div>
    </div>
    <div v-for="i in commentInfo">
      <div class="info-user">
        <span>{{i.uid}}</span>
      </div>
      <div class="info-detail">
        <p>{{i.content}}</p>
        <div class="info-other">
          <span class="date">{{i.add_time}}</span>
          <span></span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {addComment} from "../../../network/detail";
  import {formatDate} from "../../../common/utils";

  export default {
    name: "DetailCommentInfo",
    props: {
      commentInfo: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data(){
      return {
        content:""
      }
    },
    methods:{
      comment(){
        if (this.token){
          this.$prompt('请输入评论','评论',{
            customClass:"edit-address"
          }).then(({value}) =>{
            this.content=value;
            this._addComment();
            this.$emit('refresh')
          }).catch(() =>{})
        }else {
          this.$message({
            type:"warning",
            message:"请先登录",
            center:true
          })
        }

      },
      _addComment(){
        const pid=window.localStorage.getItem('uid');
        addComment(this.$route.params.id,this.content,pid).then(res =>{
          this.$message({
            type:"success",
            message:"评论成功",
            center:true
          })
        })
      }
    },
    filters: {
      showDate(value) {
        // 先将时间戳转成data对象  时间戳单位是秒，需要先*1000转成毫秒
        const date = new Date(value * 1000);
        // 再将时间对象转成字符串
        return formatDate(date, 'yyyy-MM-dd hh:ss')
      }
    }
  }
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  .header-title {
    float: left;
    font-size: 15px;
  }

  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }

  .info-user {
    padding: 15px 0 5px;
  }

  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .info-user span {
    position: relative;
    font-size: 15px;
    top: -10px;
    margin-left: 10px;
  }

  .info-detail {
    padding: 0 5px 15px;
    border-bottom: 1px solid #ccc;
  }

  .info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .info-other .date {
    margin-right: 8px;
  }

  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>

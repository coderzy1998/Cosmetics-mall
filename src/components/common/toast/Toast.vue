<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data(){
      return{
        message:'',
        isShow:false
      }
    },
    methods:{
      show(message='默认值',duration=2000)
      {
        this.message=message
        this.isShow=true
        setTimeout(() =>
        {
          this.isShow=false
          this.message=''
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,.8);
    color: #fff;
    padding: 10px;
    border-radius: 10px;
    z-index: 99;
  }
</style>

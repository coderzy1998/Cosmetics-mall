<template>
  <div class="pay-type">
    <el-radio v-model="radio" class="border-bottom" label="支付宝" @change="payType">支付宝</el-radio>
    <el-radio v-model="radio" label="微信" @change="payType">微信</el-radio>
  </div>
</template>

<script>
  export default {
    name: "OrderPayType",
    data(){
      return {
        radio:1
      }
    },
    methods:{
      payType(value){
        console.log(value);
      }
    }
  }
</script>

<style scoped>
  .pay-type{
    border-bottom: 10px solid #eee;
  }
  .el-radio{
    display: block;
    height: 44px;
    line-height: 44px;
    padding-left: 20px;
    margin: 0;
  }
  .border-bottom{
    border-bottom: 1px dashed #ccc;
  }
</style>

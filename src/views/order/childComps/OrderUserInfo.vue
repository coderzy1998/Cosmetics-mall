<template>
  <div class="user-info">
    <span class="user-name">冯姨妈</span>
    <span class="user-phone">15885020113</span>
    <p class="user-add" @click="editAddress">{{showAddress}}</p>
  </div>
</template>

<script>
  export default {
    name: "OrderUserInfo",
    data(){
      return{
        address:""
      }
    },
    computed:{
      showAddress(){
        return this.address == '' ? '点击编辑地址' : this.address
      }
    },
    methods:{
      editAddress(){
        this.$prompt('请输入收货地址','',{
          customClass:"edit-address",
          inputValue:this.address,
        }).then(({value}) =>{
          this.address=value
        }).catch(() =>{})
      }
    }
  }
</script>

<style scoped>
  .user-info{
    padding: 20px 30px;
    border-bottom: 10px solid #eee;
  }
  .user-info p{
    color: #ccc;
    font-size: 14px;
    margin-top: 10px;
  }
  .user-phone{
    padding-left: 10px;
  }
</style>

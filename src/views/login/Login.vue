<template>
  <div id="login">
    <el-tabs type="border-cart" tab-position="center">
      <el-tab-pane label="登录">
        <LoginCpn />
      </el-tab-pane>
      <el-tab-pane label="注册">
        <register />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {login} from "../../network/login";
  import LoginCpn from "./childComps/LoginCpn";
  import register from "./childComps/register";

  export default {
    name: "Login",
    components:{
      LoginCpn,
      register
    }
  }
</script>

<style scoped>
  #login{
    height: 100%;
    width: 100%;
    background: url("~assets/img/login/login.jpg") no-repeat;
    background-size: cover;
    position: absolute;
  }
</style>

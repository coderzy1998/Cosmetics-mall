<template>
  <div class="edit-info">
    <nav-bar class="nav-bar">
      <i class="el-icon-arrow-left" slot="left" @click="back"></i>
      <div slot="center">修改个人信息</div>
    </nav-bar>
    <el-form label-position="left"
             label-width="80px"
             :model="userInfo"
             status-icon ref="ruleForm" :rules="rules" >
      <el-form-item label="真实姓名" prop="name">
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model.number="userInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="userInfo.nickName"></el-input>
      </el-form-item>

      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="userInfo.imageUrl" :src="userInfo.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";

  import {editInfo} from "../../network/profile";

  export default {
    name: "EditInfo",
    components:{
      NavBar
    },
    data(){
      return {
        userInfo:{
          name:'',
          phone:"",
          email:"",
          nickName:"",
          imageUrl:""
        },
        rules:{
          name:[
            {required:true,message:"请输入名字",trigger:"blur"}
          ],
          phone: [
            {required: true,message: "请输入电话",trigger: 'blur'},
            {type:"number",message: '电话号码必须是数字',trigger: 'blur'}
          ],
          email: [
            {required:true,message:"请输入邮箱",trigger:"blur"},
            {pattern:/^\w+@[a-z0-9]+\.[a-z]+$/i,message: "请输入正确的邮箱格式",trigger: "change"}
          ],
          nickName: [
            {required:true,message:"请输入昵称",trigger:"blur"}
          ]
        },
      }
    },
    methods:{
      back(){
        this.$router.back();
      },
      submitForm(formName){
        this.$refs[formName].validate((valid)=>{
          if (valid){
            editInfo(this.userInfo).then(res =>{
              if (res.code == 0){
                this.$message({
                  message:res.msg,
                  center:true,
                  type:"success"
                })
              }
              this.$router.replace('/profile')
            })
          }else {

            return false
          }
        })
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
      },
      handleAvatarSuccess(res,file) {
        this.userInfo.imageUrl = URL.createObjectURL(file.raw);
        console.log(this.userInfo.imageUrl);
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      }
    }
  }
</script>

<style scoped>
  .edit-info{
    background: url("~assets/img/login/login1.jpg") no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .el-form{
    margin: 10% auto;
  }
  .el-form-item {
    padding-left: 30px;
  }
  .el-input{
    width: 75%;
  }
  .nav-bar{
    background-color: #fff;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    background-color: #fff;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

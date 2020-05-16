<template>
  <div class="register">
    <el-form :model="ruleForm"
             status-icon
             :rules="rules"
             ref="ruleForm"
             label-width="80px"
             class="demo-ruleForm" size="mini" label-position="left">
      <el-form-item label="账号" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {login, register} from "../../../network/login";

  export default {
    name: "register",
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            callback()
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          age: [
            {validator: checkAge, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            register(this.ruleForm.age, this.ruleForm.pass).then(res => {
              if (res.code == 0) {
                this.$alert('注册成功,是否立即登录', '', {
                  center: true,
                  // 自定义类名
                  customClass: "boxMessage",
                  showCancelButton: true,
                  confirmButtonText: "立即登陆",
                  cancelButtonText: "稍后登录",
                  type: "success"
                }).then(res => {
                  login(this.ruleForm.age,this.ruleForm.pass).then(res =>{
                    if (res.code == 0){
                      this.$alert(res.msg,'',{
                        center:true,
                        type:"success"
                      }).then(res =>{
                        window.localStorage.setItem('token',res.data.token)
                        this.$router.replace('/profile')
                      })
                    }
                  })
                }).catch(err => {

                })
              }else if (res.code == 1){
                this.$alert(res.msg,'',{
                  center:true,
                  type:"error"
                })
              }
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .demo-ruleForm {
    margin: 50% auto;
  }

  .el-input {
    width: 80%;
  }

  .el-form-item {
    padding-left: 30px;
  }
</style>

<template>
  <div class="login-cpn">
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
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {login} from "../../../network/login";

  export default {
    name: "login",
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
      return {
        ruleForm: {
          pass: '',
          age: ''
        },
        rules: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
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
            login(this.ruleForm.age, this.ruleForm.pass).then(res => {
              if (res.code == 0) {
                this.$message("登录成功", {
                  type: "success",
                  center: true
                })
                //对象转字符串
                window.localStorage.setItem('token', res.data.token);
                window.localStorage.setItem('uid',res.data.id);
                this.$router.replace('/profile')
              } else {
                this.$message({
                  type: "danger",
                  center: true,
                  message: "用户名或密码错误"
                })
              }
            })
          } else {

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

  .el-message-box--center {
    width: 100vw;
  }
</style>

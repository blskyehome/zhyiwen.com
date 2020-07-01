<template>
  <div class="login-cont">
    <vue-particles
      class="login-bg"
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="star"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="100"
      :moveSpeed="4"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="login-box">
      <div class="login-title">欢迎登录</div>
      <div class="input-group">
        <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" size="medium" v-model="loginForm.username" clearable> </el-input>
      </div>
      <div class="input-group">
        <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" size="medium" v-model="loginForm.password" show-password></el-input>
      </div>
      <div class="login-submit">
        <el-button type="success" round>登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      loginForm:{
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="scss" scope>
.login-cont {
  position: relative;
  height: 100%;
  background: #05cfa2;
  background: radial-gradient(#b4ffe2, #05cfa2);
  overflow: hidden;
}
.login-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 0;
}
.login-box{
  position: absolute;
  top: calc(50% - 142px);
  left: calc(50% - 160px);
  width: 320px;
  background: rgba($color: #ffffff, $alpha: 0.2);
  padding: 30px 40px;
  box-sizing: border-box;
  z-index: 1;
  .login-title{
    color: #058e6f;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
  }
  .input-group{
    margin-bottom: 15px;
    .el-input{
      .el-input__inner{
        background: rgba($color: #fff, $alpha: 0.6);
        border: none;
        color: #444;
      }
    }
  }
  .login-submit{
    margin-top: 40px;
    text-align: center;
    .el-button{
      width: 200px;
      background-color: #05cfa2;
      border-color: #05cfa2;
    }
  }
}
</style>

<template>
  <el-row class="wrapper">
    <el-col :md="12" class="left">
      <div class="logo"></div>
    </el-col>
    <el-col :md="12" class="right">
      <div class="user">
        <el-input
          placeholder="请输入你的账号"
          clearable
          prefix-icon="fa fa-fw fa-user"
          v-model="user.username"
        ></el-input>
        <el-input
          placeholder="请输入你的密码"
          type="password"
          prefix-icon="fa fa-fw fa-key"
          clearable
          v-model="user.password"
          @keyup.enter.native="handleLogin"
        ></el-input>
        <el-button type="primary" @click="handleLogin">
          <i class="fa fa-fw fa-power-off"></i> 登 录
        </el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      user: {
        username: "jydeng",
        password: "123456"
      },
      redirect: this.$route.query["redirect"]
    };
  },
  methods: {
    ...mapActions("user", ["login"]),
    handleLogin() {
      if (this.user.username.trim().length === 0) {
        this.$notify({
          message: "请输入你的账号!",
          type: "warning"
        });
        return false;
      }

      if (this.user.password.trim().length === 0) {
        this.$notify({
          message: "请输入你的密码!",
          type: "warning"
        });
        return false;
      }

      this.login({
        user: { username: this.user.username, role: "admin" },
        token: "admin",
        redirect: this.redirect || "/"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/mixin";
.wrapper {
  width: 600px;
  @include center;
  @include card;

  .left {
    height: 260px;
    background-image: url(../assets/logo.png);
    background-position: center center;
    background-size: 80px;
    background-repeat: no-repeat;
  }

  .right {
    position: relative;
    height: 260px;

    .user {
      width: 100%;
      box-sizing: border-box;
      padding: 0 10px;
      @include center;

      .el-input {
        line-height: 55px;
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .wrapper {
    width: 300px;
    .left {
      height: 160px;
      border-right: none;
    }
    .right {
      height: 180px;
    }
  }
}
</style>

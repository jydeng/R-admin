<template>
  <el-row class="wrapper">
    <el-col :md="12" class="left">
      <h2 class="title">vue-admin</h2>
    </el-col>
    <el-col :md="12" class="right">
      <el-input placeholder="请输入你的账号" clearable prefix-icon="fa fa-fw fa-user" v-model="user.username"></el-input>
      <el-input placeholder="请输入你的密码" type="password" prefix-icon="fa fa-fw fa-key" clearable v-model="user.password" @keyup.enter.native="handleLogin"></el-input>
      <el-button type="primary" @click="handleLogin">
        <i class="fa fa-fw fa-power-off"></i> 登 录
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["login"]),
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
        user: { username: this.user.username, role: "1" }
      });

      this.webStorageHelper.write("state", this.$store.state);
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
// 外层
.wrapper {
  width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 3px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.5);

  .el-col {
    height: 260px;
  }

  .left {
    line-height: 260px;
    border-right: 1px dotted #ddd;

    // 标题
    .title {
      font-size: 18px;
      text-align: center;
      font-weight: 525;
      color: #666666;
      margin: 0;
    }
  }

  .right {
    padding: 40px 15px 0 15px;
    line-height: 55px;

    // 输入框底部增加间距
    .el-input {
      margin-bottom: 10px;
    }

    // 制造一个block-button
    .el-button {
      width: 100%;
    }
  }
}

@media screen and (max-width: 768px) {
  .wrapper {
    width: 300px;
    .left {
      display: none;
    }
  }
}
</style>

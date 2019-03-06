<template>
  <div class="layoutHeader">
    <a class="logo"></a>
    <a class="toggle" @click="asideToggle">
      <i class="fa fa-th-list"></i>
    </a>
    <Rtheme :themeColor="themeColor" @changeThemeColor="changeColor"></Rtheme>
    <a class="space"></a>
    <el-dropdown class="userinfo" trigger="click" @command="userDropdown">
      <span>
        <img src="@/assets/profile.jpg" alt="profile" />&nbsp;
        {{ user.username }}
        <i class="fa fa-sort-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="user">
          <i class="fa fa-fw fa-user"></i> 资料
        </el-dropdown-item>
        <el-dropdown-item command="logout">
          <i class="fa fa-fw fa-power-off"></i> 注销
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "layoutHeader",
  computed: {
    ...mapGetters("common", ["user", "themeColor"])
  },
  methods: {
    ...mapActions("common", ["logout", "asideCollapse", "changeThemeColor"]),
    asideToggle() {
      this.asideCollapse();
    },
    userDropdown(command) {
      switch (command) {
        case "logout":
          this.$notify({
            message: "注销成功",
            type: "success"
          });

          this.logout();
          this.$storage.remove("state");
          this.$router.push("/login");
          break;
      }
    },
    changeColor({ themeColor }) {
      this.changeThemeColor(themeColor);
    }
  }
};
</script>
<style lang="scss" scoped>
.layoutHeader {
  display: flex;
  align-items: center;
  height: 100%;

  .logo {
    height: 100%;
    width: 80px;
    cursor: pointer;
    background-image: url(../../assets/logo.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50px;
  }

  .toggle {
    color: #222;
    margin-right: 15px;
    cursor: pointer;
  }

  .space {
    flex-grow: 1;
  }

  .userinfo {
    font-size: 13px;
    color: #666;
    span {
      line-height: 30px;
      img {
        width: 30px;
        border-radius: 50%;
        vertical-align: bottom;
      }
      .fa-sort-down {
        vertical-align: 2px;
      }
    }
  }
}
</style>

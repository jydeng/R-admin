<template>
  <el-header>
    <!-- <a href="." class="logo"></a>
    <a href="javascript:void(0);" class="toggle" @click="asideToggle">
      <i class="fa fa-th-list"></i>
    </a>
    <Rtheme :themeColor="themeColor" @changeThemeColor="changeColor"></Rtheme>
    <a class="space"></a>
    <el-dropdown class="userinfo" @command="userDropdown">
      <span>
        <img src="@/assets/profile.jpg" alt="profile">
        {{ user.username }}
        <i class="fa fa-sort-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">
          <i class="fa fa-fw fa-power-off"></i>注销
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
    1234546
  </el-header>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "layoutHeader",
  computed: {
    ...mapGetters(["user", "themeColor"])
  },
  methods: {
    ...mapActions(["logout", "asideCollapse", "changeThemeColor"]),
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
// .el-header {
//   display: flex;
//   align-items: center;
//   box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
//   background: #fff;

//   .logo {
//     height: 100%;
//     width: 100px;
//     vertical-align: middle;
//     background: url(../assets/profile.jpg) no-repeat center center;
//     background-size: 40%;
//   }

//   .toggle {
//     color: #222;
//     margin-right: 10px;
//   }

//   .space {
//     flex-grow: 1;
//   }

//   .userinfo {
//     font-size: 13px;
//     color: #666;
//     span {
//       height: 30px;
//       line-height: 30px;
//       img {
//         width: 30px;
//         border-radius: 50%;
//         vertical-align: bottom;
//       }
//       .fa-sort-down {
//         vertical-align: 2px;
//       }
//     }
//   }
// }
</style>

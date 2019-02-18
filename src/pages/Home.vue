<template>
  <el-container class="wrapper">
    <!-- 顶部 -->
    <el-header>
      <a href="." class="logo" title="Vue-Admin"></a>
      <a
        href="javascript:void(0)"
        class="toggle"
        title="菜单切换"
        @click="asideToggle"
      >
        <i class="fa fa-th-list"></i>
      </a>
      <Rtheme
        :themeColor="themeColor"
        @changeThemeColor="handleChangeThemeColor"
      ></Rtheme>
      <a class="space"></a>
      <!-- <span class="consume">实时消耗：0</span> -->
      <el-dropdown class="userinfo" @command="handleUserDropdown">
        <span>
          <img src="@/assets/profile.jpg" alt="profile">
          {{user.username}}
          <i class="fa fa-sort-down"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">
            <i class="fa fa-fw fa-power-off"></i>注销
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <el-container>
      <!-- 左侧菜单 -->
      <el-aside :style="{ width: asideWidth }">
        <div class="profile" v-show="!isCollapse">
          <img src="@/assets/profile.jpg" alt="profile">
        </div>
        <el-menu
          :router="true"
          :background-color="asideBgColor"
          :text-color="asideTxtColor"
          :default-active="activeMenu"
          :collapse="isCollapse"
        >
          <el-menu-item v-for="m in menu" :index="m.url" :key="m.id">
            <i :class="m.icon"></i>
            <span slot="title">{{m.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主功能区域 -->
      <el-container>
        <el-main>
          <transition :name="transitionName">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      isCollapse: true,
      asideBgColor: "#1D212A",
      asideTxtColor: "#B3B8C3",
      transitionName: ""
    };
  },
  computed: {
    ...mapGetters(["user", "menu", "themeColor"]),
    // 左侧菜单宽度
    asideWidth() {
      return this.isCollapse ? "55px" : "210px";
    },
    // 当前激活的菜单
    activeMenu() {
      return /(\/[a-zA-Z]*)/.exec(this.$route.path).pop();
    }
  },
  methods: {
    ...mapActions(["logout", "setmenu", "changeThemeColor"]),
    // 左侧菜单展开|收起
    asideToggle() {
      this.isCollapse = !this.isCollapse;
    },
    // 用户信息下拉指令
    handleUserDropdown(command) {
      switch (command) {
        case "logout":
          this.$notify({
            message: "注销成功",
            type: "success"
          });

          this.logout();
          this.webStorageHelper.remove("state");
          this.$router.push("/Login");
          break;

        default:
          break;
      }
    },
    // 更改主题颜色
    handleChangeThemeColor({ themeColor }) {
      this.changeThemeColor(themeColor);
    },
    // 请求菜单
    getMenu() {
      this.setmenu([
        {
          icon: "fa fa-fw fa-tachometer",
          id: "1",
          name: "首页",
          url: "/Dashboard"
        },
        {
          icon: "fa fa-fw fa-table",
          id: "2",
          name: "表格",
          url: "/Table"
        },
        {
          icon: "fa fa-fw fa-pencil",
          id: "3",
          name: "编辑器",
          url: "/Editor"
        },
        {
          icon: "fa fa-fw fa-html5",
          id: "4",
          name: "参数输入框",
          url: "/UrlInput"
        }
      ]);
    }
  },
  mounted() {
    // 判断是否需要重新请求菜单
    const needAgain = this.menu.length === 0;
    needAgain ? this.getMenu() : false;
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      } else {
        //设置动画名称
        this.transitionName = "slide-right";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// 最外层
.wrapper {
  position: absolute;
  height: 100%;
  width: 100%;

  // 顶部
  .el-header {
    display: flex;
    align-items: center;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
    background: #fff;

    // logo
    .logo {
      height: 100%;
      width: 100px;
      vertical-align: middle;
      background: url(../assets/profile.jpg) no-repeat center center;
      background-size: 40%;
    }

    // 菜单收缩展开
    .toggle {
      color: #222;
      margin-right: 10px;
    }

    // 撑开
    .space {
      flex-grow: 1;
    }

    // 实时消耗
    .consume {
      margin: 0 10px;
      font-size: 13px;
      color: #666;
    }

    // 当前用户信息
    .userinfo {
      font-size: 13px;
      color: #666;
      span {
        height: 30px;
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

  // 左侧菜单
  .el-aside {
    overflow-x: hidden;
    background: #1d212a;
    transition: width 0.5s;

    // 顶部图片
    .profile {
      height: 100px;
      padding: 20px;

      img {
        display: block;
        height: 100px;
        width: 100px;
        margin: 0 auto;
        border-radius: 50%;
      }
    }

    // 菜单
    .el-menu {
      height: calc(100% - 140px);
      width: 100%;
    }

    // 展开状态
    .el-menu:not(.el-menu--collapse) {
      width: 210px;
    }

    // 加粗显示当前的项目
    .is-active {
      font-weight: 600;
    }
  }

  // 主功能区域
  .el-main {
    position: relative;
    margin: 10px;
    padding: 0 10px 10px 10px;
    background: #fff;
    overflow-x: hidden;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  }
}

@media screen and (max-width: 768px) {
  // 手机模式不显示消耗，顶部空间不足
  .consume {
    display: none;
  }
}
</style>

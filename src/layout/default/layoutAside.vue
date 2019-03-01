<template>
  <el-aside :style="{ width: asideWidth }">
    <div class="profile" v-show="!isCollapse">
      <img src="@/assets/profile.jpg" alt="profile" />
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
        <span slot="title">{{ m.name }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "layoutAside",
  data() {
    return {
      asideBgColor: "#1D212A",
      asideTxtColor: "#B3B8C3"
    };
  },
  computed: {
    ...mapGetters(["asideWidth", "isCollapse", "menu"]),
    activeMenu() {
      return /(\/[a-zA-Z]*)/.exec(this.$route.path).pop();
    }
  }
};
</script>
<style lang="scss">
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
      box-shadow: 0 1px 1px#ddd;
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
</style>

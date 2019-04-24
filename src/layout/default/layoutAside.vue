<template>
  <el-aside :style="{ width: asideWidth }">
    <div class="profile" v-show="!isCollapse">
      <img src="@/assets/profile.png" alt="profile" />
    </div>
    <el-menu
      :router="true"
      :background-color="asideBgColor"
      :text-color="asideTxtColor"
      :default-active="activeMenu"
      :collapse="isCollapse"
    >
      <template v-for="m in menu">
        <el-submenu v-if="m.child" :key="m.id" :index="m.id">
          <template slot="title">
            <i :class="m.icon"></i>
            &nbsp;
            <span>{{ m.name }}</span>
          </template>
          <el-menu-item-group :title="`---${m.name}---`">
            <el-menu-item v-for="c in m.child" :index="c.url" :key="c.id">{{
              c.name
            }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item v-else :key="m.id" :index="m.url">
          <i :class="m.icon"></i>&nbsp;
          <span slot="title">{{ m.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "layoutAside",
  data() {
    return {
      asideBgColor: "#1D212A",
      asideTxtColor: "#B3B8C3",
      activeMenu: ""
    };
  },
  computed: {
    ...mapGetters("common", ["isCollapse"]),
    ...mapGetters("user", ["menu"]),
    asideWidth() {
      return this.isCollapse ? "55px" : "210px";
    }
  },
  watch: {
    "$route.path": {
      handler: function() {
        this.activeMenu = /(\/[a-zA-Z0-9]*)*/.exec(this.$route.path).shift();
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions("user", ["setmenu"]),
    // 请求菜单
    getMenu() {
      this.setmenu([
        {
          id: "1",
          icon: "fa fa-home",
          name: "Demo",
          child: [
            {
              id: "1-1",
              icon: "fa fa-tachometer",
              name: "首页",
              url: "/home"
            },
            {
              id: "1-2",
              icon: "fa fa-table",
              name: "数据表格",
              url: "/home/baseTable"
            },
            {
              id: "1-3",
              icon: "fa fa-pencil",
              name: "富文本编辑器",
              url: "/home/editor"
            },
            {
              id: "1-4",
              icon: "fa fa-html5",
              name: "参数输入框",
              url: "/home/params"
            },
            {
              id: "1-5",
              icon: "fa fa-clone",
              name: "操纵剪贴板",
              url: "/home/clipboard"
            }
          ]
        },
        {
          id: "2",
          icon: "fa fa-unlink",
          name: "错误页",
          child: [
            {
              id: "2-1",
              name: "404",
              url: "/page404"
            }
          ]
        }
      ]);
    }
  },
  mounted() {
    this.getMenu();
  }
};
</script>
<style lang="scss" scoped>
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
      background: #fff;
    }
  }

  // 菜单
  .el-menu {
    height: calc(100% - 165px);
    width: 100%;
  }

  // 展开状态
  .el-menu:not(.el-menu--collapse) {
    width: 210px;
  }
}
</style>

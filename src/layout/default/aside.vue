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
          <el-menu-item-group :title="m.name">
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
    $route: {
      handler: function(to) {
        this.activeMenu = to.fullPath;
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
          icon: "fa fa-puzzle-piece",
          name: "功能模块",
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
              icon: "fa fa-map",
              name: "百度地图",
              url: "/home/map"
            },
            {
              id: "1-5",
              icon: "fa fa-html5",
              name: "其他",
              url: "/home/other"
            }
          ]
        },
        {
          id: "2",
          icon: "fa fa-database",
          name: "数据分析",
          child: [
            {
              id: "2-1",
              name: "今日买量人群分析",
              url: "/analysis/crowd"
            }
          ]
        },
        {
          id: "3",
          icon: "fa fa-picture-o",
          name: "Canvas&SVG",
          child: [
            {
              id: "3-1",
              name: "hello world",
              url: "/canvas&svg/hello"
            },
            {
              id: "3-2",
              name: "变换文字",
              url: "/canvas&svg/text"
            }
          ]
        },
        {
          id: "9",
          icon: "fa fa-unlink",
          name: "错误页",
          child: [
            {
              id: "9-1",
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

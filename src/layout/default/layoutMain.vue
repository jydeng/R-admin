<template>
  <el-main>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </el-main>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "layoutMain",
  data() {
    return {
      transitionName: ""
    };
  },
  methods: {
    ...mapActions(["setmenu"]),
    // 请求菜单
    getMenu() {
      this.setmenu([
        {
          icon: "fa fa-fw fa-tachometer",
          id: "1",
          name: "首页",
          url: "/dashboard"
        },
        {
          icon: "fa fa-fw fa-table",
          id: "2",
          name: "数据表格",
          url: "/baseTable"
        },
        {
          icon: "fa fa-fw fa-pencil",
          id: "3",
          name: "富文本编辑器",
          url: "/editor"
        },
        {
          icon: "fa fa-fw fa-html5",
          id: "4",
          name: "参数输入框",
          url: "/urlInput"
        }
      ]);
    }
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
  },
  mounted() {
    this.getMenu();
  }
};
</script>
<style lang="scss">
@import "../../style/mixin.scss";
.el-main {
  position: relative;
  margin: 10px;
  padding: 0 10px 10px 10px;
  overflow-x: hidden;
  @include card;
}
</style>

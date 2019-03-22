<template>
  <el-main>
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </el-main>
</template>
<script>
export default {
  name: "layoutMain",
  data() {
    return {
      transitionName: ""
    };
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-right";
      } else {
        //设置动画名称
        this.transitionName = "slide-left";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/mixin.scss";
.el-main {
  position: relative;
  margin: 10px;
  padding: 5px 10px 10px 10px;
  overflow-x: hidden;
  @include card;
}

// 路由动画
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  position: absolute;
  width: 100%;
  will-change: transform;
  transition: all 1.5s;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>

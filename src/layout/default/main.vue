<template>
  <el-main>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <el-button
      type="text"
      class="close"
      title="关闭"
      v-if="showClose"
      @click="close"
    >
      <i class="fa fa-close"></i>
    </el-button>
  </el-main>
</template>
<script>
export default {
  name: "layoutMain",
  data() {
    return {
      transitionName: "",
      home: "/home"
    };
  },
  computed: {
    showClose() {
      return this.home !== this.$route.fullPath;
    }
  },
  watch: {
    //使用watch 监听$router的变化
    $route: {
      handler: function(to, from) {
        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if (to.meta.index > (from.meta.index || 0)) {
          //设置动画名称
          this.transitionName = "slide-right";
        } else {
          //设置动画名称
          this.transitionName = "slide-left";
        }
      }
    }
  },
  methods: {
    close() {
      this.$router.push("/");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/mixin.scss";
.el-main {
  position: relative;
  margin: 15px;
  padding: 5px;
  overflow-x: hidden;
  @include card;

  .close {
    position: absolute;
    top: 0;
    right: 9px;
    z-index: 9;
  }
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

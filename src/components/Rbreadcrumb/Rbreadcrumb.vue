<template>
  <el-row class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(link, index) in links"
        :key="index"
        :to="{ path: link.url }"
      >
        <i :class="link.icon || 'fa fa-fw fa-sticky-note'"></i>
        {{ link.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-button
      type="text"
      class="closePage"
      title="关闭页面"
      @click="closePage"
    >
      <i class="fa fa-remove"></i>
    </el-button>
  </el-row>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Rbreadcrumb",
  props: {
    // 附加内容
    append: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    ...mapGetters(["menu"]),
    links() {
      // 正则
      const reg = new RegExp("(/[a-zA-Z]*)?(/[a-zA-Z]*)?");
      // 分组匹配结果
      const matchResult = reg.exec(this.$route.path);
      // 第一层
      const first = matchResult[1];
      // 初始化，从menu中搜索菜单名与图表
      let result = [];
      if (this.menu.length) {
        // 查找第一层菜单名与图表
        result.push(this.menu.find(item => item.url === first));
      }
      // 拼接附加内容
      result = result.concat(this.append);

      return result;
    }
  },
  methods: {
    closePage() {
      this.$router.push("/");
    }
  }
};
</script>
<style lang="scss" scoped>
.breadcrumb {
  padding: 0 10px;

  .el-breadcrumb {
    font-size: 13px;
    height: 30px;
    line-height: 30px;
  }

  .closePage {
    position: absolute;
    right: 5px;
    top: 0;

    :hover {
      color: red;
    }
  }
}
</style>

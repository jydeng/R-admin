<template>
  <el-row class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(link,index) in links" :key="index" :to="{ path: link.url }">
        <i :class="link.icon || 'fa fa-fw fa-sticky-note'"></i> {{link.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
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
      //const reg = new RegExp("(?<first>/[a-zA-Z]*)?(?<second>/[a-zA-Z]*)?"); IE 不兼容分组写法
      // 分组匹配结果
      // const matchResult = reg.exec(this.$route.path).group;
      // 第一层
      // const first = matchResult.first;
      const reg = new RegExp("(/[a-zA-Z]*)?(/[a-zA-Z]*)?");
      // 分组匹配结果
      const matchResult = reg.exec(this.$route.path);
      // 根节点
      const root = "/Dashboard";
      // 第一层
      const first = matchResult[1];
      // 初始化，从menu中搜索菜单名与图表
      let retult = [this.menu.find(item => item.url === root)];
      // 查找第一层菜单名与图表
      if (first) {
        retult.push(this.menu.find(item => item.url === first));
      }
      // 拼接附加内容
      retult = retult.concat(this.append);

      return retult;
    }
  }
};
</script>

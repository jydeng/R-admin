<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(link, index) in links"
        :to="{ path: link.url }"
        :key="index"
      >
        <span>
          <i :class="link.icon || 'fa fa-fw fa-sticky-note'"></i>
          {{ link.name }}
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
function flatMenu(menu) {
  let flat = [];
  menu.forEach(m => {
    if (m.child) {
      flat = flat.concat(m.child);
    } else {
      flat = flat.concat(m);
    }
  });
  return flat;
}
export default {
  name: "iBreadcrumb",
  props: {
    // 所有的菜单项
    menu: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 附加项 [{name:xxx,icon:xxx}]
    append: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      links: []
    };
  },
  watch: {
    "$route.path": {
      handler: function(v) {
        // 正则
        const reg = new RegExp("(/[a-zA-Z0-9]*)?(/[a-zA-Z0-9]*)?");
        // 分组匹配结果
        const matchResult = reg.exec(v);
        // 第一层
        const first = matchResult[0];
        // 初始化，从menu中搜索菜单名与图表
        let result = [];
        if (this.menu.length) {
          let flat = flatMenu(this.menu);
          // 查找第一层菜单名与图表
          result.push(flat.find(item => item.url === first));
        }
        // 拼接附加内容
        result = result.concat(this.append);
        this.links = result;
      },
      immediate: true
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
}
</style>

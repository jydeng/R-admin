<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(link, i) in links"
        :to="{ path: link.url }"
        :key="i"
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
  computed: {
    flatMenu() {
      let flat = [];
      this.menu.forEach(m => {
        if (m.child) {
          flat = flat.concat(m.child);
        } else {
          flat = flat.concat(m);
        }
      });
      return flat;
    }
  },
  methods: {
    /**
     * 分析url & 拼接面包屑
     */
    analysis(to) {
      let result = [];
      if (this.flatMenu.length) {
        // 查找第一层菜单名与图表
        result.push(this.flatMenu.find(item => item.url === to.fullPath));
      }
      // 拼接附加内容
      result = result.concat(this.append);
      this.links = result;
    }
  },
  watch: {
    $route: {
      handler: function(to) {
        this.analysis(to);
      },
      immediate: true
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.analysis(this.$route);
    });
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

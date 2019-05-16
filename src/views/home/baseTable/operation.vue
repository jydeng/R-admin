<template>
  <el-table-column>
    <template slot="header">
      <el-tooltip effect="dark" placement="bottom">
        <div slot="content">
          动态组件模式，好处是可以将复杂列代码分割出来，方便管理，不便的地方是要使用其他的方式和父组件通信
        </div>
        <span>
          复杂列(component模式)
          <i class="fa fa-question-circle"></i>
        </span>
      </el-tooltip>
    </template>
    <template slot-scope="{ row }">
      <el-button type="text" @click="click(row)" title="报表">
        <i class="fa fa-fw fa fa-line-chart"></i>
      </el-button>
      <el-button type="text" @click="click(row)" title="编辑">
        <i class="fa fa-fw fa-pencil"></i>
      </el-button>
      <el-button type="text" @click="click(row)" title="删除">
        <i class="fa fa-fw fa-times"></i>
      </el-button>
    </template>
  </el-table-column>
</template>
<script>
import Emitter from "@/mixins/emitter";
export default {
  props: ["column"],
  mixins: [Emitter],
  methods: {
    click() {
      this.dispatch("baseTable", "msg", "component模式回调");
    }
  }
};
</script>

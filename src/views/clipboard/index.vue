<template>
  <div>
    <i-searchPart>
      <el-col :md="6" :sm="24">
        <el-input v-model="txt"></el-input>
      </el-col>
      <el-col :md="6" :sm="24">
        <el-button type="primary" plain class="cp">写入剪贴板</el-button>
      </el-col>
    </i-searchPart>
  </div>
</template>
<script>
import Clipboard from "clipboard";
export default {
  name: "index",
  data() {
    return {
      clipboard: null,
      txt: "随便写一点东西吧"
    };
  },
  methods: {},
  activated() {
    this.clipboard = new Clipboard(".cp", {
      text: () => {
        this.$notify({
          title: "提示",
          message: "复制成功!",
          type: "success",
          duration: 2000
        });
        return this.txt;
      }
    });
  },
  deactivated() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }
};
</script>
<style lang="scss" scoped></style>

<template>
  <div>
    <el-row class="searchPart" :gutter="10">
      <el-col :md="6" :sm="24">
        <el-button type="primary" plain @click="handleWrite"
          >尝试写入编辑器</el-button
        >
        <el-button type="primary" plain @click="handleRead"
          >尝试读取编辑器</el-button
        >
      </el-col>
    </el-row>
    <div ref="editor"></div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  name: "editor",
  data() {
    return {
      editor: null,
      content: ""
    };
  },
  methods: {
    initEditor() {
      if (!this.editor) {
        this.editor = new E(this.$refs.editor);
        this.editor.customConfig.onchange = html => {
          this.content = html;
        };
        this.editor.create();
      }
    },
    handleWrite() {
      this.editor.txt.html(
        "写入的内容,可以是html标签：<img style='width:100px;height:100px;' src='https://cn.vuejs.org/images/logo.png'/>"
      );
    },
    handleRead() {
      this.$message(`编辑器内容：${this.content}`);
    }
  },
  activated() {
    this.initEditor();
  }
};
</script>

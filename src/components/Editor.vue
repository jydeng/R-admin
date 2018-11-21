<template>
  <el-row>
    <Rbreadcrumb></Rbreadcrumb>
    <el-row class="searchPart" :gutter="10">
      <el-col :md="6" :sm="24">
        <el-button type="primary" plain @click="handleWrite">写入</el-button>
        <el-button type="primary" plain @click="handleRead">读取</el-button>
      </el-col>

    </el-row>
    <div ref="editor"></div>
  </el-row>
</template>
<script>
import E from "wangeditor";
import Rbreadcrumb from "@/common/Rbreadcrumb";
export default {
  name: "Editor",
  components: {
    Rbreadcrumb
  },
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
      alert(this.content);
    }
  },
  mounted() {
    this.initEditor();
  }
};
</script>

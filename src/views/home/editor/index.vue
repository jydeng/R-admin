<template>
  <div>
    <iSearchPart>
      <el-col :md="24" :sm="24">
        <el-button type="primary" plain @click="doc">官方文档</el-button>
        <el-button type="primary" plain @click="initEditor">初始化</el-button>
        <el-button type="primary" plain @click="write">写入</el-button>
        <el-button type="primary" plain @click="writeHTML">写入HTML</el-button>
        <el-button type="primary" plain @click="read">读取</el-button>
      </el-col>
    </iSearchPart>
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
        // 回调函数给content赋值，实现数据的同步
        this.editor.customConfig.onchange = html => {
          this.content = html;
        };
        this.editor.create();
      }
    },
    doc() {
      window.open("http://www.wangeditor.com/");
    },
    write() {
      let content = "写入一些文本";
      this.editor.txt.html(content);
    },
    writeHTML() {
      let content =
        "<img style='width:100px;height:100px;' src='https://cn.vuejs.org/images/logo.png'/>";
      this.editor.txt.html(content);
    },
    read() {
      this.$message(`编辑器内容：${this.content}`);
    }
  },
  mounted() {
    this.initEditor();
  }
};
</script>

<template>
  <div>
    <el-row class="item">
      <el-col :md="24" :sm="24">
        <p class="desc">1.参数输入辅助框：</p>
        <element-params-input
          v-model="test"
          placeholder="请输入监控链地址"
        ></element-params-input>
      </el-col>
    </el-row>
    <el-row class="item">
      <el-col :md="24" :sm="24">
        <p class="desc">2.操纵剪贴板：</p>
        <el-input type="textarea" v-model="txt"></el-input>
        <el-button type="primary" plain class="cp">
          <i class="fa fa-clone"></i> 写入剪贴板
        </el-button>
      </el-col>
    </el-row>
    <el-row class="item">
      <el-col :md="24" :sm="24">
        <p class="desc">3.图片上传方案（可自行输入地址）：</p>
        <iUploadImg
          url="/upload"
          name="file"
          label="上传你的产品logo"
          review
          input
          v-model="img"
        ></iUploadImg>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ElementParamsInput from "element-params-input";
import Clipboard from "clipboard";
export default {
  name: "other",
  components: {
    ElementParamsInput
  },
  data() {
    return {
      test: "https://www.a.com?a=1&b=2&c=3&d=4",
      txt: "随便写点东西",
      clipboard: null,
      img: ""
    };
  },
  mounted() {
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
  beforeDestroy() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }
};
</script>
<style lang="scss" scoped>
.item {
  margin-top: 10px;
  margin-left: 10px;
}
.desc {
  font-size: 14px;
  color: #010101;
  margin: 5px 0;
}
</style>

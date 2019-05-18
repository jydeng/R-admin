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
    <el-row class="item">
      <el-col :md="24" :sm="24">
        <p class="desc">5.通知循环滚动：</p>
        <div class="list" ref="list">
          <!-- <div v-for="item in list" :key="item.id">{{item.txt}}</div> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ElementParamsInput from "element-params-input";
import Clipboard from "clipboard";
import zrender from "zrender";
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
      img: "",
      list: [
        { id: 1, txt: "测试列表一" },
        { id: 2, txt: "测试列表二" },
        { id: 3, txt: "测试列表三" },
        { id: 4, txt: "测试列表四" },
        { id: 5, txt: "测试列表五" },
        { id: 6, txt: "测试列表六" },
        { id: 7, txt: "测试列表七" },
        { id: 8, txt: "测试列表八" },
        { id: 9, txt: "测试列表九" },
        { id: 10, txt: "测试列表十" }
      ],
      timer: null
    };
  },
  methods: {
    render(zr, zrender) {
      let w = zr.getWidth();
      let list = [];
      for (let index = 0; index < this.list.length; index++) {
        const item = this.list[index];
        const node = new zrender.Text({
          style: {
            text: item.txt,
            textAlign: "center",
            textVerticalAlign: "middle",
            fontSize: 14,
            fontFamily: "Lato",
            textFill: "#000",
            blend: "lighten"
          },
          position: [w / 2, 15 * index + 10]
        });

        list.push(node);
        zr.add(node);
      }
      this.timer = setInterval(() => {
        for (let index = 0; index < list.length; index++) {
          const element = list[index];
          if (element.position[1] < 0) {
            element.attr("position", [w / 2, 148]);
          } else {
            element.attr("position", [w / 2, element.position[1] - 1]);
          }
        }
      }, 60);
    }
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

    let zr = zrender.init(this.$refs["list"]);
    this.render(zr, zrender);
  },
  beforeDestroy() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
    if (this.timer) {
      window.clearInterval(this.timer);
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
}
.list {
  height: 100px;
  width: 100px;
  overflow-y: hidden;
  div {
    font-size: 13px;
    margin: 5px 0;
  }
}
</style>

<template>
  <div>
    <el-upload
      class="uploader"
      :action="url"
      :name="name"
      :on-success="success"
      :before-upload="before"
      :show-file-list="false"
      :headers="headers"
    >
      <img v-show="value" :src="value" class="uploader-img" />
      <i v-show="!value" class="fa fa-fw fa-cloud-upload uploader-icon"
        >点击上传</i
      >
    </el-upload>

    <span v-if="label" class="label">{{ label }}</span>

    <el-input
      v-if="input"
      class="customerPath"
      prefix-icon="fa fa-fw fa-html5"
      placeholder="直接输入图片地址"
      :value="value"
      ref="input"
      @input="inputUrl"
    ></el-input>

    <el-button v-show="review && value" class="reviewImg" @click="reviewImg">
      <i class="fa fa-search-plus"></i> 预览
    </el-button>
  </div>
</template>
<script>
export default {
  name: "iUploadImg",
  props: {
    // 上传img地址
    url: {
      type: String,
      required: true
    },
    // 上传用name
    name: {
      type: String,
      required: true
    },
    // 大小限制
    size: {
      type: Number,
      default: 0
    },
    // 后缀名限制
    suffix: {
      type: Array,
      default: () => {
        return [];
      }
    },
    headers: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 提示文本
    label: String,
    // 预览
    review: Boolean,
    // 直接输入url
    input: Boolean,
    // 绑定实现v-modal
    value: String
  },
  methods: {
    // 上传之前校验
    before(file) {
      if (this.suffix.length > 0 && !~this.suffix.indexOf(file.type)) {
        this.$message.error(
          `不允许上传类型${this.suffix.join("，")}以外的文件.`
        );
        return false;
      }

      if (this.size > 0 && file.size / 1024 > this.size) {
        this.$message.error(`不允许上传大于${this.size}KB的文件.`);
        return false;
      }

      return true;
    },
    // 上传成功，发射input事件
    success(res) {
      this.$emit("input", res.url);
    },
    // 预览图片
    reviewImg() {
      window.open(this.value);
    },
    // 直接输入url，发射input事件
    inputUrl(value) {
      this.$emit("input", value);
    }
  }
};
</script>
<style lang="scss" scoped>
/* 上传按钮 */
.uploader {
  position: relative;
  width: 300px;
  height: 150px;
  padding: 5px 0;
  text-align: center;
  border: 1px dashed #999;
  border-radius: 6px;

  .uploader-icon {
    width: 300px;
    line-height: 150px;
    color: #666;
  }

  .uploader-img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 300px;
    max-height: 150px;
    border-radius: 3px;
  }
}

/* 提示 */
.label {
  display: block;
  color: #666;
  font-size: 13px;
  margin-top: 10px;
}
.label::before {
  content: "*";
  color: red;
  width: 8px;
  height: 8px;
}

/* 预览图片按钮 */
.reviewImg {
  margin-top: 10px !important;
  width: 300px;
  display: block;
}

/* 人工输入图片地址 */
.customerPath {
  margin-top: 10px;
  width: 300px !important;
}
</style>

<template>
  <div class="wrap">
    <!-- 一个普通的输入框 -->
    <el-input
      :placeholder="placeholder"
      :prefix-icon="prefixicon"
      v-model="currentValue"
      @focus="showParams = true"
    ></el-input>

    <!-- 参数输入div  -->
    <div class="params" v-show="showParams" ref="params">
      <!-- 第一项 -->
      <div class="param">
        <el-input placeholder="key" v-model="first.k"></el-input>
        <el-input placeholder="value" v-model="first.v"></el-input>
        <el-button type="text" @click="handleAdd">
          <i class="fa fa-fw fa-plus"></i>
        </el-button>
      </div>

      <!-- 可以增加的项 -->
      <div class="param" v-for="(param,k) in params" :key="k">
        <el-input placeholder="key" v-model="param.k"></el-input>
        <el-input placeholder="value" v-model="param.v"></el-input>
        <el-button type="text" @click="handleRemove(k)">
          <i class="fa fa-fw fa-times"></i>
        </el-button>
      </div>

      <!-- 工具栏 -->
      <div class="tool">
        <el-button type="text" @click="showParams = false">
          <i class="fa fa-fw fa-angle-double-up">折叠</i>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RurlInput",
  props: {
    value: String,
    placeholder: {
      type: String,
      default: "请输入url."
    },
    prefixicon: {
      type: String,
      default: "fa fa-fw fa-html5"
    }
  },
  data() {
    return {
      currentValue: "",
      showParams: false,
      first: { k: "", v: "" },
      params: {}
    };
  },
  computed: {
    baseUrl() {
      return this.currentValue.split("?").shift();
    }
  },
  watch: {
    value(v) {
      this.currentValue = v;
      let params = this.getParams();
      this.params2dom(params);
    },
    currentValue(v) {
      this.$emit("input", v);
    }
  },
  methods: {
    /**
     * 从url中找到params
     */
    getParams() {
      let reg = /(\w+)=(\w*)/gi;
      let params = {};
      this.currentValue.replace(reg, (a, b, c) => {
        params[b] = c;
      });
      return params;
    },
    /**
     * 从params计算dom结构
     */
    params2dom(p) {
      let first = true;
      let params = {};

      if (Object.keys(p).length) {
        for (let k in p) {
          if (p.hasOwnProperty(k)) {
            let v = p[k];
            if (first) {
              this.first.k = k;
              this.first.v = v;
              first = false;
            } else {
              params[this.$randomStr()] = { k, v };
            }
          }
        }
      } else {
        this.first.k = "";
        this.first.v = "";
      }

      this.params = params;
    },
    /**
     * 从dom结构计算出params
     */
    dom2params() {
      let params = [];

      if (this.first.k) {
        params.push(`${this.first.k}=${this.first.v}`);
      }

      for (let k in this.params) {
        if (this.params.hasOwnProperty(k)) {
          let v = this.params[k];
          if (v.k) {
            params.push(`${v.k}=${v.v}`);
          }
        }
      }

      if (params.length) {
        this.currentValue = `${this.baseUrl}?${params.join("&")}`;
      } else {
        this.currentValue = "";
      }
    },
    /**
     * 新增一栏
     */
    handleAdd() {
      let uuid = this.$randomStr();
      this.$set(this.params, uuid, { k: "", v: "" });
    },
    /**
     * 移除一栏
     */
    handleRemove(uuid) {
      this.$delete(this.params, uuid);
    }
  },
  mounted() {
    this.currentValue = this.value;

    let params = this.getParams();
    this.params2dom(params);

    this.$watch("first", {
      handler: function() {
        this.dom2params();
      },
      deep: true
    });
    this.$watch("params", {
      handler: function() {
        this.dom2params();
      },
      deep: true
    });
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  position: relative;
  z-index: 2;

  .params {
    position: absolute;
    top: 40px;
    width: 100%;
    z-index: 2;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: #fff;

    .param {
      margin: 10px 10px 0 10px;
      .el-input {
        width: calc(50% - 20px);
      }
      .el-input + .el-input {
        margin-left: 10px;
      }
      .el-input + .el-input:before {
        position: absolute;
        top: 50%;
        left: -8px;
        transform: translateY(-50%);
        content: ":";
      }
    }

    .tool {
      text-align: center;
      margin-top: 10px;
      background-color: #f5f7fa;
    }
  }
}
</style>

<template>
  <div class="wrap">
    <!-- 地址输入框 -->
    <el-input
      type="text"
      :placeholder="placeholder"
      :prefix-icon="prefixicon"
      :value="url"
      @input="url_input"
      @focus="opened = true"
    ></el-input>

    <!-- 加点动画 -->
    <transition name="params">
      <div :class="{ params: true, absolute: absolute }" v-show="opened">
        <div class="param" v-for="(param, i) in params" :key="i">
          <el-input
            placeholder="key"
            v-model="param.k"
            @focus="mode = 'param'"
            @blur="mode = 'url'"
          ></el-input>
          <el-input
            placeholder="value"
            v-model="param.v"
            @focus="mode = 'param'"
            @blur="mode = 'url'"
          >
            <el-button
              v-if="i === 0"
              type="text"
              slot="suffix"
              @click="add"
              title="增加一项"
            >
              <i class="el-icon-circle-plus"></i>
            </el-button>
            <el-button
              v-else
              type="text"
              slot="suffix"
              @click="remove(i)"
              title="移除"
            >
              <i class="el-icon-remove"></i>
            </el-button>
          </el-input>
        </div>

        <!-- 收起 -->
        <div class="tool">
          <el-button type="text" @click="extend" title="收起">
            <i class="el-icon-caret-top"></i>
          </el-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// 查找url中的param
function matchParam(url) {
  let reg = /([^?&=]+)=([^?&=]*)/g;
  let params = [];
  let search = url.substring(url.lastIndexOf("?") + 1);
  search.replace(reg, (rs, $1, $2) => {
    let k = decodeURIComponent($1);
    let v = decodeURIComponent($2);

    params.push({ k, v });
    return rs;
  });
  return params.length === 0 ? [{ k: "", v: "" }] : params;
}

export default {
  name: "iParams",
  props: {
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请输入url."
    },
    prefixicon: {
      type: String,
      default: ""
    },
    absolute: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mode: "url",
      url: "",
      opened: false,
      params: []
    };
  },
  computed: {
    baseUrl() {
      return this.url.split("?").shift();
    },
    paramsStr() {
      let result = [];
      this.params.forEach(param => {
        if (param.k) {
          result.push(`${param.k}=${param.v}`);
        }
      });
      return result.join("&");
    }
  },
  methods: {
    // 直接输入url事件
    url_input(url) {
      this.url = url;
      this.$emit("input", url);
      if (this.mode === "url") {
        this.params = matchParam(url);
      }
    },
    // 展开收起参数输入栏
    extend() {
      this.opened = !this.opened;
    },
    // 新增一项
    add() {
      this.params.push({ k: "", v: "" });
    },
    // 移除本项
    remove(i) {
      this.params.splice(i, 1);
    }
  },
  watch: {
    value: {
      handler: function(val) {
        this.url = val;
        if (this.mode === "url") {
          this.params = matchParam(val);
        }
      },
      immediate: true
    },
    params: {
      handler: function() {
        if (this.mode === "param") {
          this.url_input(`${this.baseUrl}?${this.paramsStr}`);
        }
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  position: relative;
  z-index: 2;

  .params {
    width: 100%;
    margin-top: 10px;
    z-index: 2;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: #fff;

    .param {
      text-align: center;
      margin-top: 10px;
      .el-input {
        width: calc(50% - 10px);
      }
      .el-input + .el-input {
        margin-left: 5px;
      }
    }

    .tool {
      text-align: center;
      margin-top: 10px;
      background-color: #f5f7fa;

      .el-button {
        width: 100%;
      }
    }
  }

  .params.absolute {
    position: absolute;
    top: 40px;
  }

  .params-enter-active,
  .params-leave-active {
    transition: all 0.5s ease-out;
  }

  .params-enter,
  .params-leave-to {
    opacity: 0;
  }
}
</style>

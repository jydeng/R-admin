<template>
  <div class="wrap">
    <!-- 一个普通的输入框 -->
    <el-input
      type="text"
      :placeholder="placeholder"
      :prefix-icon="prefixicon"
      :value="url"
      @input="urlInput"
      @focus="opened = true"
    ></el-input>

    <!-- 加点动画 -->
    <transition name="params">
      <!-- 参数输入div  -->
      <div :class="{'params':true,'position':position}" v-show="opened">
        <!-- 第一项 -->
        <div class="param">
          <el-input placeholder="key" v-model="first.k"></el-input>
          <el-input placeholder="value" v-model="first.v">
            <el-button type="text" slot="suffix" @click="add" title="增加一项">
              <i class="fa fa-fw fa-plus"></i>
            </el-button>
          </el-input>
        </div>

        <!-- 可以增加的项 -->
        <div class="param" v-for="(param,i) in params" :key="i">
          <el-input placeholder="key" v-model="param.k"></el-input>
          <el-input placeholder="value" v-model="param.v" title="移除本项">
            <el-button type="text" slot="suffix" @click="remove(i)">
              <i class="fa fa-fw fa-times"></i>
            </el-button>
          </el-input>
        </div>

        <!-- 工具栏 -->
        <div class="tool">
          <el-button type="text" @click="opened = false" title="折叠">
            <i class="fa fa-fw fa-chevron-up"></i>
          </el-button>
        </div>
      </div>
    </transition>
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
    },
    position: Boolean
  },
  data() {
    return {
      url: "",
      opened: false,
      first: { k: "", v: "" },
      params: []
    };
  },
  computed: {
    baseUrl() {
      return this.url.split("?").shift();
    }
  },
  methods: {
    // 从url中找到params
    search(url) {
      let reg = /([^?&=]+)=([^?&=]*)/g;
      let params = {};
      let search = url.substring(url.lastIndexOf("?") + 1);
      search.replace(reg, (rs, $1, $2) => {
        let name = decodeURIComponent($1);
        let val = decodeURIComponent($2);
        val = String(val);
        params[name] = val;

        return rs;
      });

      return params;
    },
    // url => params
    url2params(p) {
      let first = true;
      let params = [];

      if (Object.keys(p).length) {
        for (let k in p) {
          if (p.hasOwnProperty(k)) {
            let v = p[k];
            if (first) {
              this.first.k = k;
              this.first.v = v;
              first = false;
            } else {
              params.push({ k, v });
            }
          }
        }
      } else {
        this.first.k = "";
        this.first.v = "";
      }

      this.params = params;
    },
    // params => url
    params2url() {
      let result = [];

      if (this.first.k) {
        result.push(`${this.first.k}=${this.first.v}`);
      }

      this.params.forEach(param => {
        if (param.k) {
          result.push(`${param.k}=${param.v}`);
        }
      });

      if (result.length) {
        this.url = `${this.baseUrl}?${result.join("&")}`;
      } else {
        this.url = `${this.baseUrl}`;
      }
    },
    // 直接输入url事件
    urlInput(url) {
      this.$emit("input", url);
      this.url2params(this.search(url));
    },
    // 新增一项事件
    add() {
      this.params.push({ k: "", v: "" });
    },
    // 移除本项事件
    remove(i) {
      this.params.splice(i, 1);
    }
  },
  mounted() {
    // 第一次手动同步
    this.url = this.value;
    // 渲染指定数量的param
    this.url2params(this.search(this.value));

    this.$watch("first", {
      handler: function() {
        this.params2url();
      },
      deep: true
    });

    this.$watch("params", {
      handler: function() {
        this.params2url();
      },
      deep: true
    });

    this.$watch("value", {
      handler: function(val) {
        this.url = val;
      }
    });
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

  .params.position {
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

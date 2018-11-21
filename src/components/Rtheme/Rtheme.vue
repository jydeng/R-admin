<template>
  <el-color-picker size="mini" v-model="theme" :predefine="predefine">
  </el-color-picker>
</template>

<script>
// 获取版本号, 用于下载CSS
const version = require("element-ui/package.json").version;
// 原始蓝色, 用作替换
const original = "#409EFF";
// 当前CSS配置颜色
const current = "#27B6AF";

export default {
  name: "Rtheme",
  props: {
    themeColor: String
  },
  data() {
    return {
      chalk: "", // 存放下载的CSS
      theme: this.themeColor, // 模板绑定颜色
      predefine: [current, original, "#9900CC", "#FF0033"] //备选颜色
    };
  },
  watch: {
    theme(val) {
      if (typeof val !== "string") {
        return;
      }

      this.changeThemeColor(val);
    }
  },
  methods: {
    // 更换主题色
    changeThemeColor(theme) {
      // 原始蓝色皮肤，渐变色
      const originalCluster = this.getThemeCluster(original.replace("#", ""));

      // 新皮肤，渐变色
      const themeCluster = this.getThemeCluster(theme.replace("#", ""));

      // 核心逻辑
      const gHandler = (variable, id, originalCluster, themeCluster) => {
        return () => {
          let styleTag = document.getElementById(id);
          const newStyle = this.updateStyle(
            this[variable],
            originalCluster,
            themeCluster
          );

          if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.setAttribute("id", id);
            document.head.appendChild(styleTag);
          }

          styleTag.innerText = newStyle;
          // 向父组件传递
          this.$emit("changeThemeColor", { themeColor: theme });
        };
      };

      const chalkHandler = gHandler(
        "chalk",
        "chalk-style",
        originalCluster,
        themeCluster
      );

      // 若chalk有值，表示已经下载过脚本，执行chalkHandle即可
      if (!this.chalk) {
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
        this.getCSSString(url, chalkHandler, "chalk");
      } else {
        chalkHandler();
      }
    },
    // 获取缓存脚本，计算新样式
    updateStyle(style, originalCluster, newCluster) {
      let newStyle = style;
      originalCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
      });
      return newStyle;
    },

    // 下载CSS
    getCSSString(url, callback, variable) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // 这里去掉字体链接
          this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, "");
          callback();
        }
      };
      xhr.open("GET", url);
      xhr.send();
    },

    // 根据主题色生成渐变色
    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        if (tint === 0) {
          return [red, green, blue].join(",");
        } else {
          red += Math.round(tint * (255 - red));
          green += Math.round(tint * (255 - green));
          blue += Math.round(tint * (255 - blue));

          red = red.toString(16);
          green = green.toString(16);
          blue = blue.toString(16);

          return `#${red}${green}${blue}`;
        }
      };

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        red = Math.round((1 - shade) * red);
        green = Math.round((1 - shade) * green);
        blue = Math.round((1 - shade) * blue);

        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);

        return `#${red}${green}${blue}`;
      };

      const clusters = [theme];
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
      }
      clusters.push(shadeColor(theme, 0.1));
      return clusters;
    }
  },
  mounted() {
    if (this.themeColor !== current) {
      this.changeThemeColor(this.themeColor);
    }
  }
};
</script>

<div align="center"><img src="./public/favicon.ico" width="100"></div>

## 介绍
基于Vue2.0构建的后台管理系统原型[R-admin](http://123.207.117.50)。

## 功能

初步实现了以下的功能点，后续会将日常工作中可复用的部分添加进来，敬请期待。

- Vue
- Vue-Cli 3
- Vue-Router
- Vuex
- 基于 token 认证的权限系统
- axios、jsonp 封装
- cookie、sessionStorage 封装
- FontAwesome、iconFont
- 富文本编辑器
- 自定义主题色
- Echarts 图表
- Animate.css
- ......

## 使用

- 初始化

```shell
git clone  git@github.com:jydeng/vue-admin.git
cd vue-admin
yarn
```

- 开发调试

```shell
yarn serve
```

- 打包上线

```shell
yarn lint
yarn build
```

## VSCode 插件&配置

为保证一致的开发体验，避免因为 ESLint 带来的问题，推荐采用 VSCode 编辑器，以及相同的插件&配置，使用的插件如下。

- Vetur
- VSCode Great Icons
- Vue 2Snippets
- Version Lens
- SCSS IntelliSense
- Sass
- Path Intellisense
- Prettier
- ESLint

VSCode 配置文件已经添加到项目，个性化部分可自行修改，代码风格部分建议团队统一。

## License

[MIT](https://github.com/jydeng/vue-admin//LICENSE)

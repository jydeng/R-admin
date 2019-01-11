## vue-admin

Vue2.0 企业级管理系统快速开发原型，来自日常，服务日常。

## 功能
初步实现了以下的功能点，后续会将日常工作中可复用的部分添加进来，敬请期待。
* Vue-CLI 3  
* Vue-Router
* Vuex
* 基于token认证的权限系统
* axios、jsonp封装
* cookie、sessionStorage封装
* FontAwesome
* 富文本编辑器
* 自定义主题
* 服务端渲染
* Echarts图表
* More ......


## 使用

- 初始化
```cmd
git clone  git@github.com:jydeng/vue-admin.git
cd vue-admin
yarn
```

- 开发调试
```cmd
yarn serve 
```

- 构建
```cmd
yarn lint
yarn build
```

- 服务端渲染构建&启动Koa服务器
```cmd
yarn build:win 
node server
```


## VSCode插件&配置
为保证一致的开发体验，避免因为ESLint带来的问题，推荐采用VSCode编辑器，以及相同的插件&配置，使用的插件如下。
 * Vetur
 * VSCode Great Icons
 * Vue 2Snippets
 * Version Lens
 * SCSS IntelliSense
 * Sass
 * Path Intellisense
 * Prettier
 * ESLint

 VSCode配置文件已经添加到项目，个性化部分可自行修改，代码风格部分建议团队统一。

## License

[MIT](https://github.com/jydeng/vue-admin//LICENSE)
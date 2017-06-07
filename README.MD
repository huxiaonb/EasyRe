# 项目说明

此项目将前端需要的页面打包到单独的压缩js中给html调用
采用react编写组件
打包时降react替换为preact
由于组件引入antd插件依赖于react源生 createClass 故单独将react的createClass独立出来，也可使用preact推荐的
https://github.com/laurencedorman/preact-classless-component
https://preactjs.com/

### 目录结构

 - `demo` 为演示网页源文件
 - `dist` 本库打包后文件
 - `src` 本库源代码

### 安装

先安装 nodejs 环境，在项目根目录安装依赖包

```
npm install
```

### 打包

```
npm run build
```
命令会执行打包操作，打包后文件在dist目录，打包为压缩版，压缩大小取决于引入的antd 插件的大小

### 开发

```
npm run dev
```
会打包完整react

### 技术栈

 - 打包工具：webpack
 - 编码方式：ECMAScript 6


 
 

  



### 使用

1. `git clone https://github.com/Liting1/electron-vue-template.git`
2. `npm install`
3. `npm run dev` 开发
4. `npm run build` 生产打包


### 常见问题

1. 打包应用程序时需要下载 electron-v11.2.0-win32-x64.zip 文件，下载速度很慢，下载失败。
> 如果时window系统，可以将项目下的 /doc/electron-v11.2.0-win32-x64.zip 已经下载好的文件直接复制到 `C:\Users\liting\AppData\Local\electron\Cache`文件夹下, 注：第二个目录时对应用户的目录，每个人的可能不一样

2. 下载安装依赖时如果比较慢，或者是使用npm下载electron依赖比较慢
可以使用 cnpm 从新下载依赖。



### 功能
1. 热加载开发
2. 打包生成App
3. 应用更新
4. 本地数据库sqlite
5. vue全家桶

### 项目目录结构

```
|—— app               项目打包后输出的源文件目录
|—— pack              打包成App的输出目录
|—— builder           webpack 构建应用配置目录
|—— doc               项目文档和所需文件目录
|—— config            应用打包配置目录
|—— src               项目资源目录
|	 |—— main             主线程文件目录
|	 |—— pages            其他渲染页面--子窗口页面
|	 |—— renderer	        主渲染线程目录
|  |—— static           静态资源目录
|—— .babelrc            babel 配置文件
|—— .gitignore          git 配置文件
|—— package-lock.json
|—— package.json
|—— README.md

```

SourceMap: 配置参考地址：
1. https://juejin.im/post/6844903450644316174
2. https://webpack.js.org/configuration/devtool/#development

node: 配置参考：

### css-loader
1. https://vue-loader.vuejs.org/zh/guide/extract-css.html#webpack-4


1. 打包App
2. 热加载

参考网站： https://github.com/mubaidr/vue-electron-template

https://www.cnblogs.com/kakayang/p/11766273.html


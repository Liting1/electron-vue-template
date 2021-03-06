
### 使用

1. `git clone https://github.com/Liting1/electron-vue-template.git`
2. `npm install`
3. `npm run dev` 开发
4. `npm run build` 使用 electron-builder 打包生产
5. `npm run packager-build` 使用 electron-packager 打包生产


### 常见问题

1. 打包应用程序时需要下载 electron-v11.2.0-win32-x64.zip 文件，下载速度很慢，下载失败。
> window系统，可以将项目下的 /doc/electron-v11.2.0-win32-x64.zip 已经下载好的文件直接复制到 `C:\Users\liting\AppData\Local\electron\Cache`文件夹下, 注：第二个目录时对应用户的目录，每个人的可能不一样

2. electron是其他版本的可以选择从该链接下载：https://npm.taobao.org/mirrors/electron/ electron打包所需文件所有版本下载地址

3. 下载安装依赖时如果比较慢，或者是使用npm下载electron依赖比较慢
可以使用 cnpm 从新下载依赖,

4. 若在使用cnpm 安装依赖完毕运行后出现vuex报错，请查看实际下载的版本是否和package.json 中的版本号是否一样，如果不一样则单独指定vuex版本从新下载

5. 若在安装过程中出现360警告或者是什么病毒的全部忽略，全都允许



### 功能
1. 热加载开发
2. 打包生成App
3. 应用更新
4. 本地数据库sqlite
5. vue全家桶
6. IViewUI 按需加载

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
|    |—— static           静态资源目录
|—— .babelrc            babel 配置文件
|—— .gitignore          git 配置文件
|—— package-lock.json
|—— package.json
|—— README.md

```



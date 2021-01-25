process.env.NODE_ENV = 'development';
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { proxy } = require('./common.config');

// 编译主线程
function buildMain(){
	const webpackMainConfig = require('./webpack.main.config.js');
	return new Promise((resolve, reject)=>{
		webpack(webpackMainConfig, err => {
			if(err) {
				console.log('打包主进程遇到Error！');
        reject(err);
			} else {
        resolve();
			}
		});
	})
}
// 编译渲染线程
function devRender(){
	const webpackDevConfig = require('./webpack.render.config.js');
	const compiler = webpack(webpackDevConfig);
	return new Promise((resolve, reject)=>{
	    new WebpackDevServer(compiler, {
			contentBase: webpackDevConfig.output.path,
			publicPath: webpackDevConfig.output.publicPath,
			compress: true,		// 开发服务器启用gzip压缩
			hot: true,				// 开启热加载
			// proxy,
		}).listen(8090, 'localhost', err => {
			if(err) {
				reject(err);
			}else {
				resolve();
			}	
		})
	})
}


function build(){
	Promise.all([buildMain(), devRender()]).catch(err=>{
		console.log(err);
		process.exit(1);
	})
}
build();
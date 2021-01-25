const path = require('path');
const webpack = require('webpack');
const { dependencies } = require('../package.json');
const ElectronDevWebpackPlugin = require('electron-dev-webpack-plugin');
const isDevMode = process.env.NODE_ENV === 'development';
const { params } = require('./common.config');
const CopyPlugin = require("copy-webpack-plugin");



const plugins = [
	new webpack.DefinePlugin({
		MODE: JSON.stringify(params.mode),				// 运行的环境
	}),			// 定义变量
	new CopyPlugin({ // 复制 sqlite数据库所需二进制文件
		patterns: [{
			from: './node_modules/sql.js/dist/sql-wasm.wasm'
		}]
	})
]

if(isDevMode) {
	plugins.push(new ElectronDevWebpackPlugin())	// 开发热加载electron应用)
}
module.exports = {
	mode: process.env.NODE_ENV,
	entry:{
		main: ['./src/main/main.js']
	},
	output: {
		path: path.join(__dirname, '../app/'),
		libraryTarget: 'commonjs2',
		filename: '[name].js'
	},
	watch: isDevMode,
	optimization: {
		minimize: true
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		}],
		noParse: /sql.js/,			// webpack 过滤掉对sql.js 模块的处理				
	},
	externals: [
		...Object.keys(dependencies || {})
	],
	node: {
		__dirname: isDevMode,
		__filename: isDevMode
	},
	plugins,
	target: 'electron-main'
}
const webpack = require('webpack');
const { version } = require('../config/version');

/*
	获取node运行时传递的参数
		MODE 环境(生产, 测试, 体验, 开发)
		NODE_ENV 环境(开发, 生产)
*/
const getNodeParams = () =>{
	return Object.fromEntries(
		process.argv.splice(2).map(
			ele => ele.split('=')
		)
	)
}

let params = getNodeParams();
process.env.NODE_ENV = params.NODE_ENV;
process.env.MODE = params.MODE;
const isDevMode = params.NODE_ENV === 'development';
module.exports = {
	isDevMode,
	params,
	webpackCommonConfig: {
		mode: params.NODE_ENV,
		node: {	// 设置是否允许使用node变量
			__dirname: params.NODE_ENV === 'development',
    		__filename: params.NODE_ENV === 'development',
		},
		plugins: [
			new webpack.DefinePlugin({
				VERSION: JSON.stringify(version.join('.')),		// 版本号
      			MODE: JSON.stringify(params.MODE),				// 运行的环境
      			NODE_ENV: JSON.stringify(params.NODE_ENV) 		// node环境
			}),
		]
	}
}

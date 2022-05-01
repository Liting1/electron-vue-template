const { webpackCommonConfig, isDevMode } = require('./common.config.js');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const { dependencies } = require('../package.json');
const ElectronDevWebpackPlugin = require('electron-dev-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const plugins = [
    // new BundleAnalyzerPlugin({ analyzerPort: 8888 }), // chunks 分析插件
    new CopyPlugin({ // 复制 sqlite数据库所需二进制文件
        patterns: [{
            from: './node_modules/sql.js/dist/sql-wasm.wasm'
        }]
    })
];

if (isDevMode) {
    plugins.push(new ElectronDevWebpackPlugin()); // 开发热加载electron应用
}

module.exports = merge(webpackCommonConfig, {
    entry: {
        main: [path.join(__dirname, '../src/main/main.js')]
    },
    output: {
        path: path.join(__dirname, '../app/'),
        filename: '[name].js'
    },
    watch: isDevMode,
    optimization: {
        minimize: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime','@babel/plugin-proposal-class-properties']
                }
            }

        }],
        noParse: /sql.js/ // webpack 过滤掉对sql.js 模块的处理
    },
    externals: [
        ...Object.keys(dependencies || {})
    ],
    plugins,
    target: 'electron-main',
})

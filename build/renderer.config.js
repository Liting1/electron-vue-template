const { webpackCommonConfig, isDevMode } = require('./common.config.js');
const {merge} = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const StyleLintPlugin = require('stylelint-webpack-plugin');



module.exports = merge(webpackCommonConfig, {
    entry: {
        renderer: [path.join(__dirname, '../src/renderer/index.js')]
    },
    output: {
        path: path.join(__dirname, '../app/'),
        publicPath: isDevMode ? '/' : './',
        filename: 'js/[name].[contenthash].js',
        chunkFilename: 'js/[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, { // 配置sass语法支持，并且使用的是缩进格式
            test: /\.s[ac]ss$/,
            use: [
                ...(
                    isDevMode ? ['vue-style-loader', 'style-loader'] : [{
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "../" }
                    }]
                ),
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            indentedSyntax: true // 如需使用花括号嵌套模式则设置为false
                        }
                    }
                }
            ]
        }, { // 配置支持css支持
            test: /\.css(\?.*)?$/,
            use: [
                ...(
                    isDevMode ? ['vue-style-loader', 'style-loader'] : [{
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "../" } // 添加公共路径
                    }]
                ),
                'css-loader'
            ]
        }, { // 配置Babel将ES6+ 转换为ES5
            test: /\.js(\?.*)?$/,
            exclude: file => ( // 排除node_modules文件夹
                /node_modules/.test(file) && !/\.vue\.js/.test(file)
            ),
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            }
        }, { // 配置图片文件加载
            test: /\.(png|jpe?g|gif|tif?f|bmp|webp|svg)(\?.*)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    esModule: false,
                    name: 'images/[name].[hash].[ext]'
                }
            }
        }, { // 配置字体文件加载
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: {
                loader: 'file-loader',
                options: {
                    esModule: false,
                    limit: 10000,
                    name: 'fonts/[name].[hash].[ext]'
                }
            }
        }, { // 处理node文件
            test: /\.node$/,
            loader: 'node-loader'
        }]
    },
    resolve: {
        // 引入文件时可以省略文件后缀名
        extensions: ['.js', '.json', '.vue'],
        // 常用路径别名
        alias: {
            '@': path.join(__dirname, '../src/renderer/')
        }
    },
    plugins: [
        // new BundleAnalyzerPlugin({ analyzerPort: 8888 }), // chunks 分析插件
        new CleanWebpackPlugin({ // 清除所有文件，main.js文件除外
            cleanOnceBeforeBuildPatterns: ['**/*', '!main.js*']
        }),
        new ESLintPlugin({
            extensions: ['js', 'vue'],
            emitWarning: true	// 如果出现eslint错误将会在控制台输出警告
        }),
        // new StyleLintPlugin({
        // 	files: ['**/*.{html,vue,css,sass,scss}'],
        // }),
        new HtmlWebpackPlugin({ // HTML页面模板插件
            template: path.join(__dirname, '../src/renderer/index.html'),
            filename: 'index.html',
            hash: true,
        }),
        new MiniCssExtractPlugin({ // css打包成css文件插件
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        }),
        new VueLoaderPlugin(), // vue-loader 加载插件
        new CopyPlugin({ // 复制静态文件
            patterns: [{
                from: path.join(__dirname, '../src/static/'),
                to: path.join(__dirname, '../app/static')
            }, {
                from: path.join(__dirname, '../src/pages'),
                to: path.join(__dirname, '../app/pages')
            }]
        }),
        new webpack.optimize.SplitChunksPlugin({
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                // 打包重复出现的代码
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                // 打包第三方类库
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: Infinity
                }
            }
        }),
    ],
    target: 'electron-renderer'
})

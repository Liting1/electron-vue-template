import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import Base from './base';
import { cssRule, fontRule, imageRule, nodeRule, sassRule, tsRule, vueRule } from './module';
import { CleanWebpackPlugin, HtmlWebpackPlugin, MiniCssExtractPlugin, VueLoaderPlugin, CopyPlugin, SplitChunksPlugin, DefinePlugin, ESLintPlugin, ProgressPlugin } from './plugins';
const { isDevMode, srcPatch, isProMode, appConfig } = Base.getConfig();

const plugins = [ProgressPlugin, HtmlWebpackPlugin, MiniCssExtractPlugin, VueLoaderPlugin, CopyPlugin, SplitChunksPlugin, DefinePlugin, ESLintPlugin];

if (isProMode) {
  plugins.push(CleanWebpackPlugin);
}

// plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 8888 }))

const options = {
  mode: isDevMode ? 'development' : 'production',
  devtool: isDevMode ? 'inline-source-map': undefined,
  entry: {
    renderer: [
      path.join(srcPatch, 'renderer/index.ts')
    ]
  },
  node: {
    __dirname: isDevMode,
    __filename: isDevMode
  },
  output: {
    path: path.join(srcPatch, '../app/'),
    publicPath: isDevMode ? '/' : './',
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].bundle.js'
  },
  optimization: {
    emitOnErrors: true
  },
  resolve: {
    // 引入文件时可以省略文件后缀名
    extensions: ['.ts', '.js', '.json', '.vue', '.jsx', '.tsx'],
    // 常用路径别名
    alias: {
      '@': path.join(srcPatch),
      '@render': path.join(srcPatch, 'renderer')
    }
  },
  module: {
    rules: [cssRule, sassRule, fontRule, imageRule, nodeRule, tsRule, vueRule]
  },
  plugins,
  target: ['web', 'electron-renderer']

};

export default options;

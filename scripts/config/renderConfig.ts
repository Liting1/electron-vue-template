import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import Base from './base';
import { cssRule, fontRule, imageRule, nodeRule, sassRule, tsRule, vueRule } from './module';
import {
  HtmlWebpackPlugin,
  MiniCssExtractPlugin,
  VueLoaderPlugin,
  CopyPlugin,
  SplitChunksPlugin,
  DefinePlugin,
  ESLintPlugin,
  ProgressPlugin,
  ForkTsCheckerWebpackPlugin
} from './plugins';



export default () => {
  const { isDevMode, srcPatch, appConfig } = Base.getConfig();
  const plugins = [
    ProgressPlugin(),
    HtmlWebpackPlugin(),
    MiniCssExtractPlugin(),
    VueLoaderPlugin(),
    CopyPlugin(),
    DefinePlugin(),
    SplitChunksPlugin(),
    ForkTsCheckerWebpackPlugin(),
    ESLintPlugin()
  ];

  // server
  plugins.push(new BundleAnalyzerPlugin({
    analyzerPort: 8088,
    analyzerMode: appConfig.analyzerMode ? 'server' : 'disabled',
  }));

  return  {
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
      chunkFilename: 'js/[name].bundle.js',
    },
    optimization: {
      chunkIds: 'named',
      emitOnErrors: isDevMode,
      minimize: true,
      splitChunks: {
        chunks: 'all'
      }
    },
    resolve: {
      // 引入文件时可以省略文件后缀名
      extensions: ['.ts', '.vue', '.js', '.jsx', '.tsx', '.json'],
      // 常用路径别名
      alias: {
        '@': path.join(srcPatch),
        '@render': path.join(srcPatch, 'renderer')
      }
    },
    module: {
      rules: [cssRule(), ...sassRule(), fontRule(), imageRule(), nodeRule(), tsRule(), vueRule()]
    },
    plugins,
    target: ['web', 'electron-renderer']
  };

}

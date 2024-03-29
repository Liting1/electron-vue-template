import path from 'path';
import Base from './base';
import { dependencies } from '../../package.json';
import ElectronDevWebpackPlugin from 'electron-dev-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { DefinePlugin,ProgressPlugin, ESLintPlugin } from './plugins';
import { tsRule } from './module';

export default () => {
  const { isDevMode, srcPatch } = Base.getConfig();
  const plugins = [
    new CopyPlugin({ // 复制 sqlite数据库所需二进制文件
      patterns: [{
        from: './node_modules/sql.js/dist/sql-wasm.wasm'
      }]
    }),
    DefinePlugin(),
    ProgressPlugin()
  ];

  if (isDevMode) {
    plugins.push(ESLintPlugin()); // 开发模式下 占时不生效
    plugins.push(new ElectronDevWebpackPlugin()); // 开发热加载electron应用
  }

  return  {
    entry: {
      main: [path.join(srcPatch, 'main/main.ts')]
    },
    output: {
      path: path.join(srcPatch, '../app'),
      filename: '[name].js',
      library: {
        type: 'commonjs2'
      }
    },
    mode: isDevMode ? 'development' : 'production',
    watch: isDevMode,
    optimization: {
      emitOnErrors: isDevMode,
      minimize: true
    },
    node: {
      __filename: isDevMode,
      __dirname: isDevMode
    },
    module: {
      rules: [tsRule()],
      noParse: /sql.js/ // webpack 过滤掉对sql.js 模块的处理
    },
    resolve: {
      // 引入文件时可以省略文件后缀名
      extensions: ['.ts', '.js', '.json', '.vue', '.jsx', '.tsx'],
      alias: {
        '@': path.join(srcPatch),
        '@main': path.join(srcPatch, 'main')
      }
    },
    externals: [
      ...Object.keys(dependencies || {})
    ],
    plugins,
    target: 'electron-main'
  };

}

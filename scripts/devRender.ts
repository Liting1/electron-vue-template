import Base from './config/base';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import merge from 'webpack-merge';
import chalk from 'chalk';

class DevRender {
  static init;
  private readonly options: any;
  private compiler: webpack.Compiler;
  private server: any;
  constructor(options: any) {
    if (typeof options === 'function') {
      this.options = options();
    }
    if (typeof options === 'object' && options !== null) {
      this.options = options;
    }
  }

  buildRender() {
    const { isDevMode, appConfig, options } = Base.getConfig();
    const isWeb = options.renderEnv === 'browser';
    this.compiler = webpack(
      merge(this.options, {
        output: {
          clean: isWeb
        }
      })
    );
    const { output } = this.options;
    return new Promise((resolve, reject) => {
      if (isDevMode) {
        this.server = new WebpackDevServer(
          {
            static: output.path,
            compress: true, // 开发服务器启用gzip压缩
            port: appConfig.port,
            hot: true,
            open: isWeb,
            proxy: appConfig.proxy
          },
          this.compiler
        );
        this.server.start().then(() => {
          console.log('启动服务成功');
        });
      } else {
        this.compiler.run((err) => {
          err ? reject(chalk.red('打包渲染进程错误:' + err)) : resolve(chalk.green('打包渲染进程完毕！'));
        });
      }
    });
  }
}

export default DevRender;

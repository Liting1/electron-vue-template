import webpack from 'webpack';
import chalk from 'chalk';

class DevPreload {
  private readonly options: any;
  constructor(options) {
    if (typeof options === 'function') {
      this.options = options();
    }
    if (typeof options === 'object' && options !== null) {
      this.options = options;
    }
  }

  buildPreload() {
    return new Promise((resolve, reject) => {
      webpack(this.options, (err) => {
        err ? reject(chalk.red('打包 preload 错误:' + err)) : resolve(chalk.green('打包 preload 程完毕！'));
      });
    });
  }
}

export default DevPreload;

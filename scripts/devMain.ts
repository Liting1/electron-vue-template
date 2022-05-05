import webpack from 'webpack';
import chalk from 'chalk';

class DevMain {
  private readonly options: any;
  constructor(options) {
    this.options = options;
  }

  buildMain() {
    return new Promise((resolve, reject) => {
      webpack(this.options, (err) => {
        err ? reject(chalk.red('打包主进程错误:' + err)) : resolve(chalk.green('打包主进程完毕！'));
      });
    });
  }
}

export default DevMain;

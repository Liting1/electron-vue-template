import { spawn } from 'child_process';
import chalk from 'chalk';

class Utils {
// 打开文件管理器
  openExplorer (dirPath:string) {
    if (process.platform === 'darwin') {
      spawn('open', [dirPath]);
    } else if (process.platform === 'win32') {
      spawn('explorer', [dirPath]);
    } else if (process.platform === 'linux') {
      spawn('nautilus', [dirPath]);
    }
  }

  // 打包前配置
  writeVersionConfig ({ env, mode }) {
    const runTimeObj = {
      dev: '开发版',
      test: '测试版',
      pro: '生产版',
      exp: '体验版'
    };
    const name = runTimeObj[env]; // 打包环境
    const publishTime = new Date().toLocaleString(); // 打包时间
    console.log(chalk.black.bgYellow('当前环境为：') + chalk.yellow.bgRed.bold(name));
    console.log(chalk.black.bgYellow('开发模式为：') + chalk.yellow.bgRed.bold(mode));
    console.log('currentTime:', publishTime);
  }
}

export default Utils;


process.env.NODE_ENV = 'production';
const chalk = require('chalk');
const del = require('del');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const renderConfig = require('./webpack.render.config.js');
const mainRenderConfig = require('./webpack.main.config');
const electronBuilder = require('electron-builder');
const packageJson = require('../package.json');
// const { v4: uuidv4 } = require('uuid');
// 设置 app 一些选项
// 打包渲染进程
// 压缩渲染进程
// 打包主进程
// 打包App

const build = {
  setup: {},
  run () {
    del(['./app/*', './pack/*']);
    // 初始化版本信息
    this.initSetup();
    this.writeVersionConfig();
    this.buildApp();
  },
  initSetup () {
    const setup = require('../config/version.js');
    const runTimeObj = {
      dev: '开发版',
      test: '测试版',
      release: '正式版'
    };
    setup.versionName = runTimeObj.release;
    setup.publishTime = new Date().toLocaleString();
    Object.keys(runTimeObj).forEach(key => {
      if (process.argv.indexOf(key) > 1) {
        setup.versionType = key;
        setup.versionName = runTimeObj[key];
      }
    });
    this.runTime(setup.versionType);
    this.setup = setup;
  },
  runTime (val) {
    console.log(
      chalk.black.bgYellow('当前环境为：') + chalk.yellow.bgRed.bold(val)
    );
  },
  writeVersionConfig () {
    fs.writeFileSync(path.join(__dirname, '../config/version.js'), `module.exports = ${JSON.stringify(this.setup, null, 4)}`);
    packageJson.version = this.setup.version.slice(0, 3).join('.');
    // 添加guid
    // packageJson.build.nsis.guid = uuidv4();
    fs.writeFileSync(path.join(__dirname, '../package.json'), JSON.stringify(packageJson, null, 4));
  },
  buildApp () {
    this.viewBuilder().then(async () => {
      this.packMain();
    }).catch(err => {
      console.log(err);
      process.exit(1);
    });
  },
  packMain () {
    this.mainBuild().then(() => {
      electronBuilder.build().then(() => this.openExplorer()).catch(error => {
        console.log(error);
      });
    }).catch(err => {
      console.log(err);
      process.exit(2);
    });
  },
  // 打开文件管理器
  openExplorer () {
    const dirPath = path.join(__dirname, '../pack/');
    if (process.platform === 'darwin') {
      spawn('open', [dirPath]);
    } else if (process.platform === 'win32') {
      spawn('explorer', [dirPath]);
    } else if (process.platform === 'linux') {
      spawn('nautilus', [dirPath]);
    }
  },
  viewBuilder () {
    return new Promise((resolve, reject) => {
      const renderCompiler = webpack(renderConfig);
      renderCompiler.run(err => {
        if (err) {
          reject(chalk.red('打包渲染进程:' + err));
        } else {
          console.log('打包渲染进程完毕！');
          resolve();
        }
      });
    });
  },
  mainBuild () {
    return new Promise((resolve, reject) => {
      const mainRenderCompiler = webpack(mainRenderConfig);
      mainRenderCompiler.run(err => {
        if (err) {
          reject(chalk.red('打包主进程出错' + err));
        } else {
          console.log('打包主进程完毕！');
          resolve();
        }
      });
    });
  }
};

build.run();

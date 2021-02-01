const chalk = require('chalk');
const del = require('del');
const path = require('path');
const { isDevMode, params } = require('./common.config.js');
const webpackMainConfig = require('./main.config.js');
const webpack = require('webpack');
const webpackRenderConfig = require('./renderer.config.js');
const WebpackDevServer = require('webpack-dev-server');
const { spawn } = require('child_process');
const electronBuilder = require('electron-builder');

// 构建主线程
function buildMain() {
    return new Promise((resolve, reject) => {
        webpack(webpackMainConfig, err => {
            err
                ?
                reject(chalk.red('打包主进程错误:' + err)) :
                resolve(chalk.green('打包主进程完毕！'));
        });
    });
}

// 构建渲染线程
function buildRender() {
    const compiler = webpack(webpackRenderConfig);
    return new Promise((resolve, reject) => {
        if (isDevMode) {
            new WebpackDevServer(compiler, {
                contentBase: webpackRenderConfig.output.path,
                publicPath: webpackRenderConfig.output.publicPath,
                compress: true, // 开发服务器启用gzip压缩
                hot: true, // 开启热加载
            }).listen(8090, 'localhost', err => {
                err ? reject(err) : resolve("启动服务成功");
            })
        } else {
            compiler.run(err => {
                err
                    ?
                    reject(chalk.red('打包渲染进程错误:' + err)) :
                    resolve(chalk.green('打包渲染进程完毕！'));
            })
        }
    })
}

// 打开文件管理器
function openExplorer() {
    const dirPath = path.join(__dirname, '../pack/');
    if (process.platform === 'darwin') {
        spawn('open', [dirPath]);
    } else if (process.platform === 'win32') {
        spawn('explorer', [dirPath]);
    } else if (process.platform === 'linux') {
        spawn('nautilus', [dirPath]);
    }
}

function developmentBuild() {
    Promise.all([buildMain(), buildRender()]).then(res => {
        res.forEach(item => console.log(item));
    }).catch(err => {
        console.log(err);
    })
}
// 打包前配置
function writeVersionConfig() {
    const runTimeObj = {
        dev: '开发版',
        test: '测试版',
        pro: '生产版',
        exp: '体验版'
    }
    let name = runTimeObj[params.MODE];  // 打包环境
    let publishTime = new Date().toLocaleString(); // 打包时间
    console.log(chalk.black.bgYellow('当前环境为：') + chalk.yellow.bgRed.bold(name));
}

function productionBuild() {
    del(['./app/*', './pack/*']);
    writeVersionConfig();
    Promise.all([buildMain(), buildRender()]).then(res => {
        res.forEach(item => console.log(item));
        electronBuilder.build().then(() => openExplorer()).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    })
}

// 打包开发版
if (isDevMode) {
    developmentBuild();
} else {
    productionBuild();
}

import { BrowserWindow, app } from 'electron';
import path from 'path';

const getWin = (title) => BrowserWindow.getAllWindows().filter((wins) => wins.title === title)[0];

// 用于调试主线程代码，将主线程需要打印的代码在渲染进程显示
const log = (...arg) => {
  const win = getWin('mainWin');
  win.on('show', () => {
    win.webContents.send('win-log', ...arg);
  });
};

// static 静态文件夹目录
const STATIC_PATH = MODE === 'development' ? path.join(__dirname, '../../static') : path.join(__dirname, './static');
// preload 脚本目录
const PRELOAD_SCRIPT_PATH =
  MODE === 'development' ? path.join(app.getAppPath(), 'app/preloadScript') : path.join(__dirname, './preloadScript');

export { getWin, log, STATIC_PATH, PRELOAD_SCRIPT_PATH };

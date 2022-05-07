import { BrowserWindow } from 'electron';
import path from 'path';

const getWin = (title) => BrowserWindow.getAllWindows().filter((wins) => wins.title === title)[0];

// 用于调试主线程代码，将主线程需要打印的代码在渲染进程显示
const log = (...arg) => {
  const win = getWin('mainWin');
  win.on('show', () => {
    win.webContents.send('win-log', ...arg);
  });
};

const STATIC_PATH = MODE === 'development' ? path.join(__dirname, '../../static') : path.join(__dirname, './static');

export { getWin, log, STATIC_PATH };

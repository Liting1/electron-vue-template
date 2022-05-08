import { BrowserWindow } from 'electron';
import MainWindow from '@main/createWindow/MainWindow';

const createMainWin = (options = {}) => {
  return new MainWindow(options).init();
};

const createInitiateWin = (options = {}) => {
  options = Object.assign(
    {
      title: 'initiateWin',
      width: 600,
      height: 600,
      webPreferences: {
        nodeIntegration: true // 默认是false
      }
    },
    options
  );
  return new BrowserWindow(options);
};

const createViewWin = (options = {}) => {
  options = Object.assign(
    {
      title: 'viewWin',
      width: 600,
      height: 600,
      webPreferences: {}
    },
    options
  );
  return new BrowserWindow(options);
};

export { createMainWin, createInitiateWin, createViewWin };

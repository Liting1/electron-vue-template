/*
 * @Author: your name
 * @Date: 2020-10-26 21:22:49
 * @LastEditTime: 2020-12-27 12:17:35
 * @LastEditors: Please set LastEditors
 * @Description: 主线程注册事件
 * @FilePath: \electron-vue-template\src\main\registerEvent\index.js
 */
import path from 'path';
import url from 'url';
import { app, ipcMain } from 'electron';
import mainWinEvent from './mainWinEvent';
import { createInitiateWin, createViewWin } from '../createWindow';
import updateHandle from './update';
import { getWin } from '../utils';

class RegisterEvent {
  constructor () {
    this.win = null; 		// 主窗口
    this.initiate = null;
    this.view = null;
  }

  init () {
    this.win = getWin('mainWin');
    this.openInitiateWin();
    this.openViewWin();
    this.updateApp();
    mainWinEvent.init(this.win);
  }

  getPath (file) {
    const url = process.env.NODE_ENV === 'development'
      ? '../../pages/html/'
      : 'pages/html/';
    return path.join(__dirname, url + file);
  }

  openInitiateWin () {
    ipcMain.on('open-initiate-win', () => {
      if (this.initiate) {
        return this.initiate.show();
      }
      this.initiate = createInitiateWin();
      const filePath = url.pathToFileURL(this.getPath('initiate.html')).href;
      this.initiate.loadURL(filePath);
      this.initiate.on('closed', () => {
        this.initiate = null;
        console.log('initiate is closed');
      });
    });
  }

  openViewWin () {
    ipcMain.on('open-view-win', () => {
      if (this.view) {
        return this.view.show();
      }
      this.view = createViewWin();
      const filePath = url.pathToFileURL(this.getPath('view.html')).href;
      this.view.loadURL(filePath);
      this.view.on('closed', () => {
        this.view = null;
        console.log('view is closed');
      });
    });
  }

  // 更新应用
  updateApp () {
    updateHandle(this.win);
  }
}

// 当应用程序退出时取消所有监听事件
app.on('will-quit', () => {
  ipcMain.removeAllListeners();
});

export default new RegisterEvent();

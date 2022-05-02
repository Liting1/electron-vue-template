
import url from 'url';
import path from 'path';
import electron from 'electron';
import { createMainWin } from './createWindow';
import sqlite from './sql';
import registerEvent from './registerEvent';
import shortcut from './shortcut';
import Tray from './tray';
import plugins from './plugins';

class App {
  public mode: string;
  private app: any;
  private BrowserWindow: any;
  private win: any;
  private tray: any;
  constructor ({ app, BrowserWindow }) {
    this.mode = process.env.NODE_ENV;
    this.app = app;
    this.BrowserWindow = BrowserWindow;
    this.win = null;
    this.runCheck();
    this.eventHandle(app);
  }

  /**
	 * 当运行第二个应用时，直接聚焦到第一个已经存在的实例上
	 * @return {[type]} [description]
	 */
  runCheck () {
    const gotTheLock = this.app.requestSingleInstanceLock();
    if (!gotTheLock) return this.app.quit();
    this.app.on('second-instance', () => {
      const myWindows = this.BrowserWindow.getAllWindows();
      myWindows.forEach(win => {
        if (win && !win.isDestroyed()) {
          if (win.isMinimized()) win.restore();
          win.focus();
        }
      });
    });
  }

  // 创建主窗口
  createWindow () {
    this.win = createMainWin();
    const filePath = this.mode === 'production'
      ? url.pathToFileURL(path.join(__dirname, 'index.html')).href
      : 'http://localhost:8090';
    this.win.loadURL(filePath);
    // 等待渲染进程页面加载完毕再显示窗口
    this.win.once('ready-to-show', () => this.win.show());
  }

  // 添加应用监听事件
  eventHandle (app) {
    app.on('closed', () => this.closed());
    app.on('ready', () => this.ready());
    app.on('window-all-closed', () => this.windowAllClosed());
    app.on('activate', () => this.activate());
  }

  activate () {
    if (!this.win) this.createWindow();
  }

  windowAllClosed () {
    if (process.platform !== 'darwin') {
      this.app.quit();
    }
  }

  async ready () {
    await sqlite.initDatabase();	// 初始化数据库
    this.createWindow(); 			// 创建主窗口
    this.tray = new Tray();			// 创建应用托盘
    registerEvent.init();			// 注册事件
    shortcut.init();				// 设置快捷键
    // createSocket.init();			// 创建socket
    if (this.mode === 'development') {
      plugins.installPlugin(); // 安装插件
    }
    console.log(this.mode);
  }

  closed () {
    this.win = null;
  }
}

// eslint-disable-next-line no-unused-vars
const app = new App(electron);

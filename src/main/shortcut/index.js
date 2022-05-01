// 注册快捷键
import { app, globalShortcut } from 'electron';
import { getWin } from '../utils';
class Shortcut {
  constructor () {
    this.win = null; // 主窗口
  }

  init () {
    this.win = getWin('mainWin');
    this.unregister();
    this.openTools(this.win);
  }

  unregister () {
    globalShortcut.unregister('CommandOrControl+Shift+i');
  }

  register (key, cb) {
    globalShortcut.register(key, cb);
  }

  // 注册打开控制台快捷键
  openTools (win) {
    this.register('CommandOrControl+Shift+C', () => {
      win.webContents.toggleDevTools({
        mode: 'right' // 在右侧打开控制台
      });
    });
  }
}

// 当所有窗口都关闭时，取消所有的快捷键注册
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

export default new Shortcut();

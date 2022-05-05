import { ipcMain, BrowserWindow } from 'electron';

class MainWinEvent {
  private win: BrowserWindow;
  init(win) {
    this.win = win;
    this.minimize();
    this.close();
    this.winClose();
    this.maximize();
  }

  // 窗口最小化
  minimize() {
    ipcMain.on('win-minimize', () => {
      this.win.minimize();
    });
  }

  // 窗口最大化
  maximize() {
    ipcMain.on('win-maximize', () => {
      if (this.win.isMaximized()) {
        this.win.unmaximize();
      } else {
        this.win.maximize();
      }
    });
  }

  // 关闭窗口
  winClose() {
    ipcMain.on('win-close', () => {
      this.win.hide();
    });
  }

  close() {
    this.win.on('close', (e) => {
      e.preventDefault();
      this.win.hide();
    });
  }
}

export default new MainWinEvent();

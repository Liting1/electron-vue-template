import { ipcMain } from 'electron';

class MainWinEvent {
  init (win) {
    this.win = win;
    this.minimize();
  }

  // 窗口最小化
  minimize () {
    ipcMain.on('win-minimize', () => {
      this.win.minimize();
    });
  }

  // 关闭窗口
  closeWin () {
    ipcMain('win-close', () => {
      this.win.hide();
    });
  }
}

export default new MainWinEvent();

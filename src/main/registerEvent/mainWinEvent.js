import { ipcMain } from 'electron';

class MainWinEvent {
  init (win) {
    this.win = win;
    this.minimize();
    this.close();
    this.winClose();
  }

  // 窗口最小化
  minimize () {
    ipcMain.on('win-minimize', () => {
      this.win.minimize();
    });
  }

  // 关闭窗口
  winClose () {
    ipcMain.on('win-close', () => {
      this.win.hide();
    });
  }

  close () {
    this.win.on('close', (e) => {
      e.preventDefault();
      this.win.hide();
    });
  }
}

export default new MainWinEvent();

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
}

export default new MainWinEvent();

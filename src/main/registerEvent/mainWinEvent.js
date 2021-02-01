import { ipcMain } from 'electron';

class MainWinEvent {
  init (win) {
    this.win = win;
    this.minimize();
    this.close();
  }

  // 窗口最小化
  minimize () {
    ipcMain.on('win-minimize', () => {
      this.win.minimize();
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

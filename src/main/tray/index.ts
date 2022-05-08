import { app, Tray, Menu, nativeImage, shell, BrowserWindow } from 'electron';
import { getWin, STATIC_PATH } from '@/main/utils';
export default class {
  private tray: Tray;
  private win: BrowserWindow;
  private options: Record<string, any>;
  constructor(options) {
    this.options = options;
    this.win = getWin('mainWin');
  }

  init() {
    // Menu.setApplicationMenu(null);  // 清除默认的顶部菜单
    app.whenReady().then(() => {
      const imgPath = `${STATIC_PATH}/img/icon.jpg`;

      const image = nativeImage.createFromPath(imgPath);
      this.tray = new Tray(image);
      const contextMenu = Menu.buildFromTemplate([
        {
          label: '打开托盘文档',
          type: 'normal',
          click() {
            shell.openPath('https://www.electronjs.org/docs/api/tray').catch((err) => console.log(err));
          }
        },
        {
          label: '退出',
          type: 'normal',
          click() {
            app.exit();
            app.quit();
            app.quit();
          }
        }
      ]);
      this.tray.setToolTip('木头人');
      this.tray.setContextMenu(contextMenu);
      this.addEventListen();
    });
  }

  addEventListen() {
    this.tray.on('click', () => this.handleClick());
  }

  destroy() {
    this.tray.destroy();
  }

  // 处理图片点击事件
  handleClick() {
    this.win.show();
  }
}

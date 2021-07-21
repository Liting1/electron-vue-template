import { app, Tray, Menu, nativeImage, shell } from 'electron';
import path from 'path';
import { getWin } from '../utils';

export default class {
  constructor () {
    this.tray = null;
    this.win = getWin('mainWin');
    this.init();
  }

  init () {
    // Menu.setApplicationMenu(null);  // 清除默认的顶部菜单
    app.whenReady().then(() => {
      const imgPath = NODE_ENV === 'development'
        ? path.join(__dirname, '../../static/img/icon.jpg')
        : path.join(__dirname, './static/img/icon.jpg');

      const image = nativeImage.createFromPath(imgPath);
      this.tray = new Tray(image);
      const contextMenu = Menu.buildFromTemplate([{
        label: '打开托盘文档',
        type: 'normal',
        click () {
          shell.openPath('https://www.electronjs.org/docs/api/tray');
        }
      }, {
        label: '退出',
        type: 'normal',
        click () {
          app.exit();
          app.quit();
          app.quit();
        }
      }]);
      this.tray.setToolTip('木头人');
      this.tray.setContextMenu(contextMenu);
      this.addEventListen();
    });
  }

  addEventListen () {
    this.tray.on('click', () => this.handleClick());
  }

  destroy () {
    this.tray.destroy();
  }

  // 处理图片点击事件
  handleClick () {
    this.win.show();
  }
};

import path from 'path';
import { BrowserWindow } from 'electron';

class MainWindow {
  private options: Record<string, any>
  constructor (options) {
    this.options = options;
  }

  init () {
    return new BrowserWindow({
      title: 'mainWin',
      width: 1200, // 窗口宽度
      height: 800, // 窗口高度
      frame: true, // 是否显示默认菜单栏
      icon: path.join(__dirname, '../../../static/img/icon.jpg'),
      backgroundColor: '#fff',	// 窗口背景颜色
      show: false, // 创建窗口后不显示窗口
      hasShadow: false,
      webPreferences: {
        contextIsolation: false,
        webSecurity: false, // 是否开启跨域
        nodeIntegration: true 	// 在渲染进程引入node模块
      }
    });
  }
}
export default MainWindow;

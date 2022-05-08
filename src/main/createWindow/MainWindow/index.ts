import { BrowserWindow } from 'electron';
import merge from 'webpack-merge';
import { STATIC_PATH, PRELOAD_SCRIPT_PATH } from '@main/utils';

class MainWindow {
  private readonly options: Record<string, any>;
  constructor(options) {
    this.options = options;
  }

  init() {
    return new BrowserWindow(
      merge(
        {
          title: 'mainWin',
          width: 1200, // 窗口宽度
          height: 800, // 窗口高度
          resizable: false,
          frame: true, // 是否显示默认菜单栏
          icon: `${STATIC_PATH}/img/icon.jpg`,
          backgroundColor: '#fff', // 窗口背景颜色
          show: false, // 创建窗口后不显示窗口
          hasShadow: false,
          webPreferences: {
            preload: `${PRELOAD_SCRIPT_PATH}/mainView/index.js`,
            // contextIsolation: true,
            webSecurity: false // 是否开启跨域
            // nodeIntegration: true // 在渲染进程引入node模块
          }
        },
        this.options
      )
    );
  }
}
export default MainWindow;

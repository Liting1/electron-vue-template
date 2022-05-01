/*
 * @Author: your name
 * @Date: 2020-10-26 21:15:35
 * @LastEditTime: 2020-12-27 11:59:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-template\src\renderer\event\index.js
 */
import { ipcRenderer } from 'electron';
// 在渲染线程触发 ———— 主线程监听的事件函数
export default {
  openInitiateWin () {
    ipcRenderer.send('open-initiate-win');
  },
  openViewWin () {
    ipcRenderer.send('open-view-win');
  },
  // 手动检查应用更新
  checkUpdate () {
    ipcRenderer.send('check-update');
  },
  // 下载应用程序
  downloadApp () {
    ipcRenderer.send('download-app');
  },
  // 下载完毕安装最新版程序
  installationProgram () {
    ipcRenderer.send('isUpdateNow');
  },
  // 安装应用
  isUpdateNow () {
    ipcRenderer.send('isUpdateNow');
  },
  // 主窗口最小化
  minimizeMainWin () {
    ipcRenderer.send('win-minimize');
  },
  // 主窗口最大化
  maximizeMainWin () {
    ipcRenderer.send('win-maximize');
  },
  // 隐藏窗口
  closeWin () {
    ipcRenderer.send('win-close');
  }
};

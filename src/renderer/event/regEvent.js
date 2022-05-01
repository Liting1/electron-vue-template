/*
 * @Author: your name
 * @Date: 2020-12-27 11:59:10
 * @LastEditTime: 2020-12-27 12:19:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-template\src\renderer\event\regEvent.js
 */

import { ipcRenderer } from 'electron';
// 在渲染进程监听 --- 主线程触发的事件
class RegisterEvent {
  constructor () {
    // 存储应用实例对象
    this.app = null;
  }

  init (app) {
    this.app = app;
    this.regEvent({
      'update-message': (e, msg) => this.messageEvent(msg),
      'download-progress': this.downloadProgress,
      'win-log': this.log
    });
  }

  regEvent (events) {
    for (const ev in events) {
      ipcRenderer.on(ev, events[ev]);
    }
  }

  // 检查应用更新
  messageEvent (msg) {
    this.app.$store.commit('setUpdateMessage', msg);
  }

  downloadProgress (event, progress) {
    console.log('文件下载进度：', progress);
  }

  // 用于打包后调试主程序
  log (...arg) {
    console.log(...arg);
  }
}

export default new RegisterEvent();

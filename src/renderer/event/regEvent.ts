import { ipcRenderer } from 'electron';
// 在渲染进程监听 --- 主线程触发的事件
class RegisterEvent {
  private app: any;
  init(app) {
    this.app = app;
    this.regEvent({
      'update-message': (e, msg) => this.messageEvent(msg),
      'download-progress': this.downloadProgress,
      'win-log': this.log
    });
  }

  regEvent(events) {
    for (const ev in events) {
      ipcRenderer.on(ev, events[ev]);
    }
  }

  // 检查应用更新
  messageEvent(msg) {
    // this.app.$store.commit('setUpdateMessage', msg);
  }

  downloadProgress(event, progress) {
    console.log('文件下载进度：', progress);
  }

  // 用于打包后调试主程序
  log(...arg) {
    console.log(...arg);
  }
}

export default new RegisterEvent();

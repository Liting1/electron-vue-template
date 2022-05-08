const { contextBridge } = require('electron');

class MainView {
  init() {
    console.log('初始化预加载脚本');
    contextBridge.exposeInMainWorld('electronAPI', {
      showNotification: (title = '', body = '') => {
        const notice = new Notification(title, { body });
        notice.onclick = () => {
          console.log('is ok ?');
        };

        notice.onerror = (err) => {
          console.log(err);
        };

        notice.onclose = () => {
          console.log('is close !!');
        };

        // notice.icon
      }
    });
  }
}

const mainView = new MainView();
mainView.init();

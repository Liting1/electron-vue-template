import { ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';

const updateConfig = {
  // 软件更新下载地址
  url: 'http://localhost/app',
  mode: 103 // 更新方式 101->强制更新, 102->协商更新, 103->主动更新
};
const message = {
  error: { status: -1, msg: '检测更新查询异常', err: '' },
  checking: { status: 0, msg: '正在检查更新...' },
  updateAva: { status: 1, msg: '检测到新版本,是否立即下载最新版本！' },
  updateNotAva: { status: 2, msg: '您现在使用的版本为最新版本,无需更新！' }
};

function updateHandle(win) {
  // 设置更新地址
  autoUpdater.setFeedURL(updateConfig.url);
  let timer = null;
  // 强制更新
  if (updateConfig.mode === 101 || updateConfig.mode === 102) {
    // 应用程序启动后5s__执更新检查
    timer = setTimeout(() => {
      autoUpdater.checkForUpdates().catch((err) => console.log(err));
      clearTimeout(timer);
    }, 5000);
  }

  if (updateConfig.mode === 102 || updateConfig.mode === 103) {
    // 协商更新
    autoUpdater.autoDownload = false;
    // 下载新版本
    ipcMain.on('download-app', () => {
      autoUpdater.downloadUpdate().catch((err) => console.log(err));
    });
    // 主动更新,手动执行自动更新检查
    ipcMain.on('check-update', () => {
      autoUpdater.checkForUpdates().catch((err) => console.log(err));
    });
  }

  // 更新出错出
  autoUpdater.on('error', function (err) {
    message.error.err = err;
    sendUpdateMessage(message.error);
  });

  // 检查更新
  autoUpdater.on('checking-for-update', () => {
    sendUpdateMessage(message.checking);
  });

  // 发现新版本
  autoUpdater.on('update-available', () => {
    sendUpdateMessage(message.updateAva);
  });

  // 当前版本为最新版本
  autoUpdater.on('update-not-available', () => {
    sendUpdateMessage(message.updateNotAva);
  });

  // 更新下载进度
  autoUpdater.on('download-propress', (progress) => {
    win.webContents.send('download-progress', progress);
  });

  autoUpdater.on('update-downloaded', () => {
    sendUpdateMessage('最新安装包下载完毕');
    ipcMain.on('isUpdateNow', () => {
      console.log('开始更新');
      autoUpdater.quitAndInstall();
    });

    win.webContents.send('isUpdateNow');
  });

  function sendUpdateMessage(msg) {
    win.webContents.send('update-message', { ...msg, ...updateConfig });
  }
}

export default updateHandle;

/*
 * @Author: your name
 * @Date: 2020-11-28 16:37:48
 * @LastEditTime: 2020-12-27 11:52:30
 * @LastEditors: Please set LastEditors
 * @Description: 检查应用程序更新
 * @FilePath: \electron-vue-template\src\main\registerEvent\update.js
 */
const { ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
// 软件更新下载地址
const uploadUrl = 'http://localhost/app';

function updateHandle(win){
	let message = {
		error: {status: -1, msg: '检测更新查询异常'},
		checking: {status: 0, msg: '正在检查更新...'},
		updateAva: {status: 1, msg: '检测到新版本,正在下载,请稍后'},
		updateNotAva: {status: 2, msg: '您现在使用的版本为最新版本,无需更新！'}
	}

	let versionInfo = '';
	let timer = null;
	// 设置更新地址
	autoUpdater.setFeedURL(uploadUrl);

	// 更新出错出
	autoUpdater.on('error', function(err){
		message.error.err = err;
		sendUpdateMessage(message.error);
	});

	// 检查更新
	autoUpdater.on('checking-for-update', ()=>{
		sendUpdateMessage(message.checking);
	});

	// 发现新版本
	autoUpdater.on('update-available', ()=>{
		sendUpdateMessage(message.updateAva);
	});

	// 当前版本为最新版本
	autoUpdater.on('update-not-available',()=>{
		sendUpdateMessage(message.updateNotAva);
	});

	// 更新下载进度
	autoUpdater.on('download-propress', (progress)=>{
		win.webContents.send('download-progress', progress)
	});

	autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate)=>{
		sendUpdateMessage("最新安装包下载完毕");
		ipcMain.on('isUpdateNow', (e, arg) => {
			console.log('开始更新');
			autoUpdater.quitAndInstall();
		});

		// win.webContents.send('isUpdateNow');
	});

	// 应用程序启动后5s__执更新检查
	// timer = setTimeout(()=>{
	// 	autoUpdater.checkForUpdates();
	// 	clearTimeout(timer);
	// }, 5000);

	ipcMain.on('check-update', ()=>{
		console.log("手动执行自动更新检查");
		autoUpdater.checkForUpdates();
	})

	function sendUpdateMessage(text){
		win.webContents.send('update-message', text);
	}
}

module.exports = updateHandle;

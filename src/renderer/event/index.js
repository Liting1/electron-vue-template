/*
 * @Author: your name
 * @Date: 2020-10-26 21:15:35
 * @LastEditTime: 2020-12-27 11:59:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-template\src\renderer\event\index.js
 */
import {ipcRenderer} from 'electron';
// 在渲染线程触发 ———— 主线程监听的事件函数
export default {
	openInitiateWin(){
		ipcRenderer.send("open-initiate-win")
	},
	openViewWin(){
		ipcRenderer.send('open-view-win');
	},
	// 手动检查应用更新
	checkUpdate(){
		ipcRenderer.send('check-update');
	},
	// 下载完毕安装最新版程序
	installationProgram(){
		ipcRenderer.send('isUpdateNow');
	},
	// 安装应用
	isUpdateNow(){
        ipcRenderer.send('isUpdateNow')
    }
}

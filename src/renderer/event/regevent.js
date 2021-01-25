/*
 * @Author: your name
 * @Date: 2020-12-27 11:59:10
 * @LastEditTime: 2020-12-27 12:19:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-template\src\renderer\event\regevent.js
 */

import {ipcRenderer} from 'electron';
// 在渲染进程监听 --- 主线程触发的事件
class RegisterEvent {
    init(){
        this.regEvent({
            'update-message': this.messageEvent,
            'download-progress': this.downloadProgress
        });
    }
    regEvent(events){
        for(let ev in events){
            ipcRenderer.on(ev,events[ev])
        }
    }
    // 检查跟新
    messageEvent(event, text){
        console.log("检查更新：", text);
    }
    downloadProgress(event, progress){
        console.log('文件下载进度：',progress);
    }
}

export default new RegisterEvent;

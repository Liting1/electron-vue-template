/*
 * @Author: your name
 * @Date: 2020-12-06 15:19:42
 * @LastEditTime: 2020-12-06 17:01:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-template\src\main\socket\index.js
 */

import WebSocket from 'ws';
import os from 'os';

class CreateSocket {
  constructor () {
    this.wss = null;
  }

  init () {
    this.createSocket();
    this.addEventListen();
    console.log('socketServer:' + this.getIPAddress() + ':8089');
  }

  createSocket () {
    this.wss = new WebSocket.Server({
      host: this.getIPAddress(),
      port: 8089
    });
  }

  // 获取电脑ip
  getIPAddress () {
    const interfaces = os.networkInterfaces();
    for (const devName in interfaces) {
      const facie = interfaces[devName];
      for (let i = 0; i < facie.length; i++) {
        const alias = facie[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address;
        }
      }
    }
  }

  // 进行广播函数
  broadcast (data) {
    this.wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }

  addEventListen () {
    // 当有客户端连接时触发
    this.wss.on('connection', ws => {
      console.log('有客户端连接');
      // 接收客户端发送的消息
      ws.on('message', data => {
        console.log('接收数据：', typeof data, data);
        this.broadcast(data);
      });

      // 当客户端关闭连接时触发
      ws.on('close', ev => {
        console.log('客户端断开连接');
      });

      // 当发送错误时触发
      ws.on('error', err => {
        console.log(err);
      });
    });
  }
}

export default new CreateSocket();

/*
 * @Author: your name
 * @Date: 2020-10-24 20:29:25
 * @LastEditTime: 2020-12-27 09:41:11
 * @LastEditors: Please set LastEditors
 * @Description: 创建窗口
 * @FilePath: \electron-vue-template\src\main\createWindow\index.js
 */
import { BrowserWindow } from 'electron';
import path from 'path';
const createMainWin = (options = {}) => {
  options = Object.assign({
    title: 'mainWin',
    width: 1200,				// 窗口宽度
    height: 800,				// 窗口高度
    frame: false,
    icon: path.join(__dirname, '../../static/img/icon.jpg'),
    backgroundColor: '#fff',	// 窗口背景颜色
    show: false,				// 创建窗口后不显示窗口
    hasShadow: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true 	// 在渲染进程引入node模块
    }
  }, options);
  return new BrowserWindow(options);
};

const createInitiateWin = (options = {}) => {
  options = Object.assign({
    title: 'initiateWin',
    width: 600,
    height: 600,
    webPreferences: {
      nodeIntegration: true // 默认是false
    }
  }, options);
  return new BrowserWindow(options);
};
const createViewWin = (options = {}) => {
  options = Object.assign({
    title: 'viewWin',
    width: 600,
    height: 600,
    webPreferences: {
      nodeIntegration: true 	// 默认是false
    }
  }, options);
  return new BrowserWindow(options);
};

export {
  createMainWin,
  createInitiateWin,
  createViewWin
};

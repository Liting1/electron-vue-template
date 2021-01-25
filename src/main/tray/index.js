const { app, Tray, Menu } = require('electron');
const path = require('path');
const {getWin} = require('../utils');

module.exports = class {
    constructor() {
        this.tray = null;
        this.win = getWin('mainWin');
        this.init();
    }
    init(){
        // Menu.setApplicationMenu(null);  // 清除默认的顶部菜单
        app.whenReady().then(()=>{
            this.tray = new Tray(path.join(__dirname, './icon/icon.png'));
            this.addEventListen();
            const contextMenu = Menu.buildFromTemplate([
                { label: 'Item1', type: 'normal' },
                { label: 'Item2', type: 'normal' },
                { label: 'Item3', type: 'normal' },
                { label: '退出', type: 'normal', role: 'quit' }
            ])


            this.tray.setToolTip('木头人');
            this.tray.setContextMenu(contextMenu);
        })
    }
    addEventListen(){
        this.tray.on('click', () => this.handleClick())
    }
    //处理图片点击事件
    handleClick(){
        this.win.show();
    }
}

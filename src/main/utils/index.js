const { BrowserWindow } = require('electron');

module.exports = {
  getWin (title) {
    	return BrowserWindow.getAllWindows().filter(wins => wins.title == title)[0];
  }
};

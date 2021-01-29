import { BrowserWindow } from 'electron';

const getWin = title => (
  BrowserWindow.getAllWindows().filter(wins => wins.title === title)[0]
);

export { getWin };

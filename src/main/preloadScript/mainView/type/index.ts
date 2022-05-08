export interface IElectronAPI {
  showNotification: (title: string, body: string) => void;
  openViewWin: () => void;
}

declare global {
  export interface Window {
    readonly electronAPI: IElectronAPI;
  }
}

export interface IElectronAPI {
  showNotification: (title: string, body: string) => void;
}

declare global {
  export interface Window {
    readonly electronAPI: IElectronAPI;
  }
}

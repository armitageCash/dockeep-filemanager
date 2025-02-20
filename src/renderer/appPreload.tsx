import '@main/window/windowPreload';
import { contextBridge, ipcRenderer } from 'electron';

console.log('[ERWT] : Preload execution started');

contextBridge.exposeInMainWorld('Dockeep', {
  FileManager: {
    readFile: (filePath: string) => ipcRenderer.invoke('read-file', filePath),
  },
  selectFolder: () => ipcRenderer.invoke('dialog:openDirectory'),
  watchDirectory: (dirPath: string) =>
    ipcRenderer.send('watch-directory', dirPath),
  stopWatching: () => ipcRenderer.send('stop-watching'),
  onDirectoryChange: (
    callback: (event: { type: string; filePath: string }) => void,
  ) => {
    ipcRenderer.on('directory-changed', (_event, data) => callback(data));
  },
});

window.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const { env } = process;
  const versions: Record<string, unknown> = {};
});

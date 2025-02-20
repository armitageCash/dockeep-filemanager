import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import chokidar, { FSWatcher } from 'chokidar';
import path from 'path';
import fs from 'fs';
import { registerTitlebarIpc } from '@main/window/titlebarIpc';

// Electron Forge automatically creates these entry points
declare const APP_WINDOW_WEBPACK_ENTRY: string;
declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let appWindow: BrowserWindow;
let watcher: FSWatcher | null = null; // Guardamos el watcher
/**
 * Create Application Window
 * @returns {BrowserWindow} Application Window Instance
 */
export function createAppWindow(): BrowserWindow {
  // Create new window instance
  appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    autoHideMenuBar: false,
    frame: true,
    titleBarStyle: 'default',
    icon: path.resolve('assets/images/appIcon.ico'),
    webPreferences: {
      webSecurity: false,
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: APP_WINDOW_PRELOAD_WEBPACK_ENTRY,
      sandbox: false,
    },
  });

  // Load the index.html of the app window.
  appWindow.loadURL(APP_WINDOW_WEBPACK_ENTRY);

  // Show window when its ready to
  appWindow.on('ready-to-show', () => appWindow.show());

  // Register Inter Process Communication for main process
  registerMainIPC();

  // Close all windows when main window is closed
  appWindow.on('close', () => {
    if (watcher) {
      watcher.close(); // Cierra el watcher al cerrar la app
    }
    appWindow = null;
    app.quit();
  });

  return appWindow;
}

/**
 * Register Inter Process Communication
 */
function registerMainIPC() {
  /**
   * Here you can assign IPC related codes for the application window
   * to Communicate asynchronously from the main process to renderer processes.
   */
  ipcMain.handle('dialog:openDirectory', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(appWindow, {
      properties: ['openDirectory'],
    });
    return canceled ? null : filePaths[0];
  });
  // IPC para observar el directorio
  ipcMain.on('watch-directory', (_event, directoryPath) => {
    if (watcher) {
      watcher.close(); // Cierra cualquier watcher previo
    }

    watcher = chokidar.watch(directoryPath, {
      persistent: true, // Mantiene el watcher activo
      ignoreInitial: false, // No ignorar archivos existentes
      depth: 1, // Nivel de profundidad en subdirectorios
    });

    watcher
      .on('add', (filePath) => {
        appWindow?.webContents.send('directory-changed', {
          type: 'add',
          filePath,
        });
      })
      .on('change', (filePath) => {
        appWindow?.webContents.send('directory-changed', {
          type: 'change',
          filePath,
        });
      })
      .on('unlink', (filePath) => {
        appWindow?.webContents.send('directory-changed', {
          type: 'unlink',
          filePath,
        });
      });

    console.log(`Observando cambios en: ${directoryPath}`);
  });
  // IPC para detener la observación del directorio
  ipcMain.on('stop-watching', () => {
    if (watcher) {
      watcher.close();
      watcher = null;
      console.log('Observación detenida');
    }
  });
  // Escucha la solicitud del renderer para leer el archivo
  ipcMain.handle('read-file', async (_event, filePath: string) => {
    try {
      const data = fs.readFileSync(filePath);
      return {
        success: true,
        name: path.basename(filePath),
        buffer: data,
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  registerTitlebarIpc(appWindow);
}

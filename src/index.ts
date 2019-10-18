import { BrowserWindow, app } from 'electron'
import { autoUpdater } from 'electron-updater'
import debug from 'electron-debug'
import { hasBlacklist } from './blocker/RequestBlocker'
import logger from 'electron-log'
import { resolve } from 'path'
import windowStateKeeper from 'electron-window-state'

debug()

let mainWindow: BrowserWindow | null

autoUpdater.logger = logger
autoUpdater.autoDownload = true

async function createWindow(): Promise<void> {
  const mainWindowState = windowStateKeeper({
    defaultHeight: 800,
    defaultWidth: 1200
  })

  mainWindow = new BrowserWindow({
    darkTheme: true,
    width: mainWindowState.width,
    height: mainWindowState.height,
    x: mainWindowState.x,
    y: mainWindowState.y,
    show: false,
    webPreferences: {
      preload: resolve(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  await mainWindow.loadURL('https://youtube.com')

  mainWindow.setTitle('YouTube - Desktop')
  mainWindow.setMenu(null)

  mainWindowState.manage(mainWindow)

  mainWindow.webContents.session.webRequest.onBeforeRequest((details, callback) => {
    const isCancel = hasBlacklist(details)
    callback({ cancel: isCancel })
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('ready-to-show', () => {
    if (mainWindow) mainWindow.show()
  })
}

app.on('ready', () => {
  createWindow()
    .then(() => autoUpdater.checkForUpdatesAndNotify())
    .catch((error) => logger.error(error))
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow().catch((error) => logger.error(error))
})

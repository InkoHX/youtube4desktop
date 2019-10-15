import { BrowserWindow, app } from 'electron'
import { autoUpdater } from 'electron-updater'
import { isAdvertisement } from './blocker/BlockRequest'
import logger from 'electron-log'
import windowStateKeeper from 'electron-window-state'

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
    y: mainWindowState.y
  })

  await mainWindow.loadURL('https://youtube.com')

  mainWindow.setTitle('YouTube - Desktop')
  mainWindow.setMenu(null)
  if (process.env.NODE_ENV === 'development') mainWindow.webContents.openDevTools()

  mainWindowState.manage(mainWindow)

  mainWindow.webContents.session.webRequest.onBeforeRequest((details, callback) => {
    const isCancel = isAdvertisement(details)
    callback({ cancel: isCancel })
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow().catch((error) => logger.error(error))
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow().catch((error) => logger.error(error))
})

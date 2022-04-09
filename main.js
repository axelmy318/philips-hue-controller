'use strict';

// Import parts of electron to use
const { app, dialog, BrowserWindow, ipcMain } = require('electron');
const axios = require('axios')
const path = require('path')
const url = require('url')
const storage = require('electron-json-storage')
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep a reference for dev mode
let dev = false;
if ( process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath) ) {
  dev = true;
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 1250,
    minHeight: 600,
    maxWidth: 1920,
    maxHeight: 1080,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  // and load the index.html of the app.
  let indexPath;
  if ( dev && process.argv.indexOf('--noDevServer') === -1 ) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:4000',
      pathname: 'index.html',
      slashes: true
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    });
  }
  
  mainWindow.loadURL( indexPath );

  //Check for updates
  //autoUpdater.setFeedURL('https://github.com/axelmy318/philips-hue-controller.git')
  autoUpdater.logger = log
  //autoUpdater.checkForUpdatesAndNotify()
  

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // Open the DevTools automatically if developing
    //if ( dev ) {
      mainWindow.webContents.openDevTools();
    //}
  });

  

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

/*app.on('ready', function()  {
  autoUpdater.checkForUpdatesAndNotify();
});*/

ipcMain.handle('GET_APP_VERSION', async(event, arg) => {
  //arg.callback(app.getVersion())
  let result

  await new Promise((resolve, reject) => {
    resolve(app.getVersion())
   }).then(response => result = response)

  return app.getVersion()
  //event.sender.send('app_version', { version: app.getVersion() });
});

ipcMain.handle('SAVE_TO_STORAGE', async(event, arg) => {
  const defaultDataPath = storage.getDefaultDataPath()
  
  if(defaultDataPath) {
    storage.set(arg.key, arg.data, function(error) {
      if (error) throw error;
    });
  }
})

ipcMain.handle('catch-on-main', async(event, arg) => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1')
  return response.data
})

ipcMain.handle('GET_LOCAL_DEVICES', async(event, arg) => {
  let result;

  await axios.get("https://discovery.meethue.com/").then(response => {
    result = response.data
  })

  return result
}) 

ipcMain.handle('GET_FROM_STORAGE', async(event, arg) => {
  let result
  
  await new Promise((resolve, reject) => {
    storage.get(arg.key, (error, value) => {
     if (error) {
      reject(error)
     } else {
      resolve(value)
     }
    })
   }).then(response => result = response)

   return result
})

ipcMain.on('CHECK_FOR_UPDATES', () => {
  if( dev ) {
    mainWindow.send('SET_UPDATE_STATUS', {status: 'UPDATE_NOT_AVAILABLE'})
  } else {
    autoUpdater.checkForUpdatesAndNotify()
  }
})

ipcMain.on('RESTART_AND_INSTALL_UPDATE', () => {
  if( dev ) {
    console.log('Restarting app to apply update')
  } else {
    autoUpdater.quitAndInstall()
  }
})

autoUpdater.on('update-available', () => {
  console.log('Update available')
  mainWindow.send('SET_UPDATE_STATUS', {status: 'UPDATE_AVAILABLE'})
})

autoUpdater.on('error', (err) => {
  console.log('error', err)
  mainWindow.send('SET_UPDATE_STATUS', {status: 'ERROR', error: err})
})

autoUpdater.on('download-progress', (progressObj) => {
  console.log('download-progress', progressObj)
  mainWindow.send('SET_UPDATE_STATUS', {status: 'UPDATE_DOWNLOADING', progress: progressObj})
})

autoUpdater.on('update-downloaded', () => {
  console.log('update downloaded')
  mainWindow.send('SET_UPDATE_STATUS', {status: 'UPDATE_DOWNLOADED'})
})

autoUpdater.on('update-not-available', () => {
  console.log('update not available')
  mainWindow.send('SET_UPDATE_STATUS', {status: 'UPDATE_NOT_AVAILABLE'})
})

/*ipcMain.on('CHECK_FOR_UPDATES', () => {
  autoUpdater.checkForUpdatesAndNotify()
})

ipcMain.on('CHECK_FOR_UPDATE_TEST', (event, ...args) => {
  mainWindow.send('UPDATE_STATUS', {version: 'xddd'})
  console.log({version: 'xxxddd'})
})

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

autoUpdater.on("error", (error) => {
  const dialogOpts = {
  type: 'info',
  buttons: ['Ok'],
  title: 'Update available',
  message: "dwda",
  detail: error
}
dialog.showMessageBox(dialogOpts, (response) => {})
})

let progressDialog

autoUpdater.on("update-available", (_event, releaseNotes, releaseName) => {
    const dialogOpts = {
    type: 'info',
    buttons: ['Ok'],
    title: 'Update available',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'Downloading update...'
  }
  mainWindow.webContents.send('update-available')

  progressDialog = dialog.showMessageBox(dialogOpts, (response) => {})
})

autoUpdater.on('download-progress', (progressObj) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Ok'],
    title: 'Update available',
    message: "Philips HUE Controller",
    detail: `Download speed: ${progressObj.bytesPerSecond} | Downloaded  ${progressObj.percent}%`
  }
  //mainWindow.send('download-progress', {progressObj})
//dialog.showMessageBox(dialogOpts, (response) => {})
})

autoUpdater.on("update-downloaded", (_event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Update downloaded',
    message: process.platform === 'win32' ? releaseNotes: releaseName,
    detail: 'The update has been downloaded. Restart the application to apply the update.'
  }

  mainWindow.send('UPDATE_DOWNLOADED', {version: 'xddd'})

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if(returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})

autoUpdater.on("update-not-available", (_event, releaseNotes, releaseName) => {
  mainWindow.webContents.send('update-available')
})*/
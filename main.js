'use strict';
const {app} = require('electron');
const path = require('path');
const url = require('url');
const mainWindow = require('./main-window');

app.on('ready', mainWindow.create);
  
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
  
app.on('activate', () => {
    mainWindow.create();
});
'use strict';

const {BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win;

function create() { 
    if(win === undefined) {
        win = new BrowserWindow({width: 800, height: 600});

        win.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true
        }));
    
        win.on('closed', () => {
            win = undefined
        }); 
    }    
}

exports.create = create;
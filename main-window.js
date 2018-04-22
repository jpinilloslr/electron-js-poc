const {BrowserWindow, remote} = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const DecompressZip = require('decompress-zip');

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

function uploadZipFile() {
}

function extractAndExploreZipFile() {
    var fileNames = remote.dialog.showOpenDialog(win, {
        properties: ['openFile'],
        filters: [
            { name: 'Zip file', extensions: ['zip'] },            
            { name: 'All files', extensions: ['*'] }
          ]
      });

      if(fileNames.length > 0) {
        uncompress(fileNames[0], "extracted-data", listContent);
      }
}

function uncompress(sourceFile, destinationPath, onDone){
    var unzipper = new DecompressZip(sourceFile);

    unzipper.on('error', function (err) {
        console.log('Caught an error', err);
    });
    
    unzipper.on('extract', onDone);
    
    unzipper.on('progress', function (fileIndex, fileCount) {
        
        console.log('Extracted file ' + (fileIndex + 1) + ' of ' + fileCount);
    });
    
    unzipper.extract({
        path: destinationPath
    });
}

function println(text) {
    document.getElementById('output').innerText += text + '\r\n';
}

function listContent() {
    var fileList = [];
    walkSync("extracted-data", fileList);
    fileList.forEach(function(currentFile) {
        println(currentFile);
    });
}

function walkSync(dir, filelist) {
    var files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            filelist = walkSync(dir + '/' + file, filelist);
        }
        else {
            filelist.push(file);
        }
    });
    return filelist;
};

exports.create = create;
exports.uploadZipFile = uploadZipFile;
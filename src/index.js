const { app, BrowserWindow, Menu, BrowserWindowProxy } = require('electron');
const url = require('url');
const path = require('path');


if(process.env.NODE_ENV  !== 'production'){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });
}


let mainWindows
let NewProductWindow


app.on('ready', () =>{
    mainWindows = new BrowserWindow({
        webPreferences: {
            contextIsolation: true
          }
    });
    mainWindows.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }));

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
});


function createNewProductWindow() {
   NewProductWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'Add a new Product',
        webPreferences: {
            contextIsolation: true
          }
    });
    NewProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new-product.html'),
        protocol: 'file',
        slashes: true
    }));
}

const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Product',
                accelerator: 'Ctrl+N',
                click(){
                    createNewProductWindow();
                }
            }
        ]
    }
];
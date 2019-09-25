const { app, BrowserWindow } = require('electron')
const fs = require('fs')
const placar = { vitoriasPlayer1: 0, vitoriasPlayer2: 0, empates: 0 }
    // fs.writeFile('placar.json')
var stringPlacar = JSON.stringify(placar, null, '\t');
fs.writeFile('placar.json', stringPlacar, function(err) {
    if (err) return console.error(err);
    console.log('done');
})


let win

function createWindow() {
    win = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html')


    // win.webContents.openDevTools()


    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
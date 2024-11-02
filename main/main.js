const { app, BrowserWindow } = require('electron');
const path = require('path');

require('./AudioService.js');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, "../public/TRVG_Logo.png"),
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    win.removeMenu();

    if (app.isPackaged) {
        import("electron-serve").then((module) => {
            const appServe = module.default({ directory: path.join(__dirname, "../out") });
            appServe(win).then(() => {
                win.loadURL("app://-");
            });
        });
    } else {
        win.loadURL("http://localhost:3000");
        win.webContents.on("did-fail-load", () => {
            win.webContents.reloadIgnoringCache();
        });
    }
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
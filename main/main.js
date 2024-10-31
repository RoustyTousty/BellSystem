const { app, BrowserWindow } = require("electron");
const path = require("path");

let appServe;

if (app.isPackaged) {
  import("electron-serve").then((module) => {
    appServe = module.default({ directory: path.join(__dirname, "../out") });
  });
}

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
      appServe(win).then(() => {
        win.loadURL("app://-");
      });
    } else {
      win.loadURL("http://localhost:3000");
    //   win.webContents.openDevTools();
      win.webContents.on("did-fail-load", (e, code, desc) => {
        win.webContents.reloadIgnoringCache();
      });
    }
  };

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
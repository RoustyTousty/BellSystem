const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    on: (channel, callback) => {
        ipcRenderer.on(channel, callback);
    },
    send: (channel, args) => {
        ipcRenderer.send(channel, args);
    },

    selectFile: () => ipcRenderer.invoke('select-file'),
    saveSound: (filePath, fileName) => ipcRenderer.invoke('save-sound', filePath, fileName),
    getSchedule: () => ipcRenderer.invoke('get-schedule'),
    addSchedule: (time, fileName) => ipcRenderer.invoke('add-schedule', time, fileName),
});
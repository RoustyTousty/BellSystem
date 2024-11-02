const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    on: (channel, callback) => {
        ipcRenderer.on(channel, callback);
    },
    send: (channel, args) => {
        ipcRenderer.send(channel, args);
    },

    saveAudioFile: (filename, data) => ipcRenderer.invoke('save-audio-file', filename, data),
    deleteAudioFile: (filename) => ipcRenderer.invoke('delete-audio-file', filename),
    getAudioFiles: () => ipcRenderer.invoke('get-audio-files'),
});
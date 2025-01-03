const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    on: (channel, callback) => {
        ipcRenderer.on(channel, callback);
    },
    send: (channel, args) => {
        ipcRenderer.send(channel, args);
    },

    selectFile: () => ipcRenderer.invoke('select-file'),
    getSchedule: () => ipcRenderer.invoke('get-schedule'),
    addSchedule: (time, fileName) => ipcRenderer.invoke('add-schedule', time, fileName),


    saveSound: (filePath, fileName) => ipcRenderer.invoke('save-sound', filePath, fileName),
    playSound: (event, fileName) => ipcRenderer.invoke('play-sound', event, fileName),

    getTemplates: () => ipcRenderer.invoke('get-templates'),
    saveTemplate: (event, template) => ipcRenderer.invoke('save-template', event, template),
    deleteTemplate: (event, templateName) => ipcRenderer.invoke('delete-template', event, templateName),
    activateTemplate: (event, templateName) => ipcRenderer.invoke('activate-template', event, templateName),
});
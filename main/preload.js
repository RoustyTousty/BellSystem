const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    on: (channel, callback) => {
        ipcRenderer.on(channel, callback);
    },
    send: (channel, args) => {
        ipcRenderer.send(channel, args);
    },

    // AudioService
    saveSound: (event, fileBuffer, fileName) => ipcRenderer.invoke('save-sound', event, fileBuffer, fileName),
    deleteSound: (event, fileName) => ipcRenderer.invoke('delete-sound', event, fileName),
    listSounds: () => ipcRenderer.invoke('list-sounds'),

    // TemplateService
    getTemplates: () => ipcRenderer.invoke('get-templates'),
    saveTemplate: (event, template) => ipcRenderer.invoke('save-template', event, template),
    deleteTemplate: (event, templateName) => ipcRenderer.invoke('delete-template', event, templateName),
    activateTemplate: (event, templateName) => ipcRenderer.invoke('activate-template', event, templateName),
});
const { ipcMain, dialog } = require('electron');
const player = require('play-sound')();
const path = require('path');

const { saveSound } = require('./AudioService');
const { getTemplates, saveTemplate, deleteTemplate, activateTemplate } = require('./TemplateService');

ipcMain.handle('save-sound', (event, filePath, fileName) => {
    saveSound(filePath, fileName);
});

ipcMain.handle("play-sound", (event, fileName) => {
    const filePath = path.join(__dirname, "../../sounds", fileName);

    player.play(filePath, (err) => {
        if (err) {
            console.error(`Error playing ${fileName}:`, err);
        } else {
            console.log(`${fileName} is playing.`);
        }
    });
});

ipcMain.handle("get-templates", () => {
	return getTemplates()
});

ipcMain.handle("save-template", (event, template) => {
	saveTemplate(template)
});

ipcMain.handle("delete-template", (event, templateName) => {
	deleteTemplate(templateName)
});

ipcMain.handle("activate-template", (event, templateName) => {
	activateTemplate(templateName)
});
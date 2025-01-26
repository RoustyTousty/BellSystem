const { ipcMain } = require('electron');

const { saveSound, listSounds, deleteSound } = require('./AudioService');
const { getTemplates, saveTemplate, deleteTemplate, activateTemplate } = require('./TemplateService');

ipcMain.handle("save-sound", (event, filePath, fileName) => {
	saveSound(filePath, fileName);
});
  
ipcMain.handle("list-sounds", () => {
	return listSounds();
});
  
ipcMain.handle("delete-sound", (event, fileName) => {
	deleteSound(fileName);
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
const { ipcMain, dialog } = require('electron');
const { saveSound } = require('./AudioService');
const { loadSchedule, addSchedule } = require('./ScheduleService');

ipcMain.handle('save-sound', (event, filePath, fileName) => {
    saveSound(filePath, fileName);
});

ipcMain.handle('get-schedule', () => {
    return loadSchedule();
});

ipcMain.handle('add-schedule', (event, time, fileName) => {
    addSchedule(time, fileName);
});

ipcMain.handle('select-file', async () => {
    const result = await dialog.showOpenDialog({ properties: ['openFile'] });
    if (result.canceled || result.filePaths.length === 0) {
        return null;
    }
    const filePath = result.filePaths[0];
    const fileName = path.basename(filePath);
    return { filePath, fileName };
});
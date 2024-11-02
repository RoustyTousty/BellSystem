const path = require('path');
const fs = require('fs');
const { app, ipcMain } = require('electron');

const audioDir = path.join(app.getPath('userData'), 'audio_files');
if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir);
}

ipcMain.handle('save-audio-file', (event, filename, data) => {
    const filePath = path.join(audioDir, filename);
    fs.writeFileSync(filePath, data);
    return filePath;
});

ipcMain.handle('delete-audio-file', (event, filename) => {
    const filePath = path.join(audioDir, filename);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
});

ipcMain.handle('get-audio-files', () => {
    console.log(fs.readdirSync(audioDir).map(file => path.join(audioDir, file)))
    return fs.readdirSync(audioDir).map(file => path.join(audioDir, file));
});
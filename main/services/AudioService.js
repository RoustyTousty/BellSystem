const fs = require('fs');
const path = require('path');

const soundsDir = path.join(__dirname, '../../sounds');

if (!fs.existsSync(soundsDir)) {
    fs.mkdirSync(soundsDir);
}

const saveSound = (filePath, fileName) => {
    if (!filePath || !fileName) {
        throw new Error("Invalid filePath or fileName");
    }
    const destination = path.join(soundsDir, fileName);
    fs.copyFileSync(filePath, destination);
    console.log(`${fileName} saved successfully.`);
};

module.exports = { saveSound };
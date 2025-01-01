const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');
const play = require('play-sound')();

const configPath = path.join(__dirname, '../../config/schedule.json');

const loadSchedule = () => {
    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, JSON.stringify([])); // Initialize as empty array
        return [];
    }
    try {
        return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    } catch (error) {
        console.error("Error parsing schedule.json:", error);
        fs.writeFileSync(configPath, JSON.stringify([])); // Reinitialize on error
        return [];
    }
};

const addSchedule = (time, fileName) => {
    const schedules = loadSchedule();
    schedules.push({ time, fileName });
    fs.writeFileSync(configPath, JSON.stringify(schedules, null, 2));

    // Schedule playback
    schedule.scheduleJob(time, () => {
        const filePath = path.join(__dirname, '../../sounds', fileName);
        play.play(filePath, (err) => {
            if (err) console.error(`Error playing ${fileName}:`, err);
        });
    });
};

module.exports = { loadSchedule, addSchedule };
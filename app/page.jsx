"use client"
import { useState } from 'react';

export default function HomePage() {
    const [file, setFile] = useState(null);
    const [schedule, setSchedule] = useState([]);

    const handleUpload = async () => {
      const result = await window.electronAPI.selectFile();
      if (result) {
          const { filePath, fileName } = result;
          await window.electronAPI.saveSound(filePath, fileName);
      }
  };

    const handleAddSchedule = async () => {
        const time = "12:00";
        const fileName = "bell.mp3";
        await window.electronAPI.addSchedule(time, fileName);
    };

    const fetchSchedule = async () => {
        const schedule = await window.electronAPI.getSchedule();
        setSchedule(schedule);
    };

    return (
        <div>
            <h1>Sound Scheduler</h1>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
            <button onClick={handleAddSchedule}>Add Schedule</button>
            <button onClick={fetchSchedule}>Load Schedule</button>
            <ul>
                {schedule.map((item, index) => (
                    <li key={index}>{item.time} - {item.fileName}</li>
                ))}
            </ul>
        </div>
    );
}
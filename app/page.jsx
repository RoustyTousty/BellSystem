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

            <div className="navbar bg-base-100">
                    <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-5 w-5 stroke-current">
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </div>
                                <ul
                                    tabIndex={0}
                                    className="menu dropdown-content bg-base-100 rounded-box mt-4 w-30 p-2 shadow">
                                    <li><a>Piemeers</a></li>
                                    <li><a>Piemeers</a></li>
                                    <li><a>Piemeers</a></li>
                                    <li><a>Piemeers</a></li>
                                </ul>
                        </div>
                    </div>

                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl">TRVģ zvana sistēma</a>
                    </div>

                    <div className="flex-none">
                        <button className="btn btn-square btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-5 w-5 stroke-current">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                        </svg>
                        </button>
                    </div>
                </div>


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

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Izvēlēties failu</span>
                    <span className="label-text-alt">Alt label</span>
                </div>
                <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                <div className="label">
                    <span className="label-text-alt">Alt label</span>
                    <span className="label-text-alt">Alt label</span>
                </div>
            </label>

            
                
        </div>
    );
}
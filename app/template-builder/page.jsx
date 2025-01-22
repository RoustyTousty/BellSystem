"use client";
import { useEffect, useState } from "react";

export default function TemplateBuilder() {
  const [templates, setTemplates] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState({ name: "", schedule: [] });
  const [newTime, setNewTime] = useState("");
  const [newSound, setNewSound] = useState("");

  // Fetch templates on load
  useEffect(() => {
    const fetchTemplates = async () => {
      const savedTemplates = await window.electronAPI.getTemplates();
      setTemplates(savedTemplates);
    };
    fetchTemplates();
  }, []);

  const addTime = () => {
    if (!newTime || !newSound) return alert("Please fill both time and sound!");
    setCurrentTemplate((prev) => ({
      ...prev,
      schedule: [...prev.schedule, { time: newTime, fileName: newSound }],
    }));
    setNewTime("");
    setNewSound("");
  };

  const saveTemplate = async () => {
    if (!currentTemplate.name) return alert("Template must have a name!");
    await window.electronAPI.saveTemplate(currentTemplate);
    alert("Template saved successfully!");
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Zvana Trafaretu Izveidotājs</h1>
      <div className="mb-5">
        <label>Trafareta nosaukums:</label>
        <input
          type="text"
          value={currentTemplate.name}
          onChange={(e) => setCurrentTemplate({ ...currentTemplate, name: e.target.value })}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-5">
        <label>Pievienot laiku:</label>
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <select
          value={newSound}
          onChange={(e) => setNewSound(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Mūzika</option>
          <option value="Smooth.mp3">Smooth.mp3</option>
          {/* Dynamically add sound options here */}
        </select>
        <button onClick={addTime} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Pievienot
        </button>
      </div>
      <ul>
        {currentTemplate.schedule
          .sort((a, b) => a.time.localeCompare(b.time))
          .map((item, index) => (
            <li key={index}>
              {item.time} - {item.fileName}
            </li>
          ))}
      </ul>
      <button onClick={saveTemplate} className="mt-5 bg-green-500 text-white px-4 py-2 rounded">
        Saglabāt trafaretu
      </button>
    </div>
  );
}
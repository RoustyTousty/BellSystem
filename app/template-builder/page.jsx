"use client";
import { useEffect, useState } from "react";

export default function TemplateBuilder() {
  const [templates, setTemplates] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState({ name: "", schedule: [] });
  const [newTime, setNewTime] = useState("");
  const [newSound, setNewSound] = useState("");

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
    <div className="p-5 bg-neutral text-primary min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-10">Zvana Trafaretu Izveidotājs</h1>

      <div className="mb-5 w-full max-w-md">
        <label className="block mb-2">Trafareta nosaukums:</label>
        <input
          type="text"
          value={currentTemplate.name}
          onChange={(e) => setCurrentTemplate({ ...currentTemplate, name: e.target.value })}
          className="border p-2 rounded w-full bg-base-100 text-primary"
        />
      </div>

      <div className="mb-5 w-full max-w-md">
        <label className="block mb-2">Pievienot laiku:</label>
        <div className="flex">
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="border p-2 rounded mr-2 bg-base-100 text-primary"
          />
          <select
            value={newSound}
            onChange={(e) => setNewSound(e.target.value)}
            className="border p-2 rounded bg-base-100 text-primary"
          >
            <option value="">Mūzika</option>
            <option value="Smooth.mp3">Smooth.mp3</option>
          </select>
          <button
            onClick={addTime}
            className="btn btn-primary text-neutral"
          >
            Pievienot
          </button>
        </div>
      </div>

      <ul className="w-full max-w-md">
        {currentTemplate.schedule
          .sort((a, b) => a.time.localeCompare(b.time))
          .map((item, index) => (
            <li key={index} className="py-2 px-2 border-b-2 border-base-100">
              {item.time} - {item.fileName}
            </li>
          ))}
      </ul>

      <button
        onClick={saveTemplate}
        className="btn btn-primary text-neutral"
      >
        Saglabāt trafaretu
      </button>
    </div>
  );
}
"use client";
import { useEffect, useState } from "react";

export default function TemplateBuilder() {
  const [templates, setTemplates] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState({ name: "", schedule: [] });
  const [newTime, setNewTime] = useState("");
  const [newSound, setNewSound] = useState("");
  const [availableSounds, setAvailableSounds] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const savedTemplates = await window.electronAPI.getTemplates();
      setTemplates(savedTemplates);
    };

    const fetchSounds = async () => {
      const sounds = await window.electronAPI.listSounds();
      setAvailableSounds(sounds);
    };

    fetchTemplates();
    fetchSounds();
  }, []);

  const addBellRing = () => {
    if (!newTime || !newSound) {
      return alert("Lūdzu aizpildiet visus laukus (laiks un skaņa)!");
    }
    setCurrentTemplate((prev) => ({
      ...prev,
      schedule: [...prev.schedule, { time: newTime, sound: newSound }],
    }));
    setNewTime("");
    setNewSound("");
  };

  const removeBellRing = (index) => {
    setCurrentTemplate((prev) => {
      const updatedSchedule = prev.schedule.filter((_, i) => i !== index);
      return { ...prev, schedule: updatedSchedule };
    });
  };

  const saveTemplate = async () => {
    if (!currentTemplate.name) return alert("Lūdzu nosauciet sarakstu!");
    if (currentTemplate.schedule.length === 0)
      return alert("Sarakstā ir jābūt vismaz vienam zvana laikam!");
    await window.electronAPI.saveTemplate(currentTemplate);
    alert("Saraksts saglabāts veiksmīgi!");
  };

  return (
    <div className="p-5 bg-neutral text-primary h-screen overflow-visible flex flex-col items-center pt-20">
      <h1 className="text-4xl font-bold mb-10">Zvana Saraksta Izveidotājs</h1>

      <div className="mb-5 w-full max-w-md">
        <label className="block mb-2 text-xl font-semibold">Saraksta nosaukums:</label>
        <input
          type="text"
          value={currentTemplate.name}
          onChange={(e) =>
            setCurrentTemplate({ ...currentTemplate, name: e.target.value })
          }
          className="border p-2 rounded w-full bg-base-100 text-primary"
        />
      </div>

      <div className="mb-5 w-full max-w-md">
        <label className="block text-xl font-semibold mb-2">Pievienot zvana laiku:</label>
        <div className="flex items-center justify-between">
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="border p-2 rounded mr-2 bg-base-100 text-primary"
          />
          <select
            value={newSound}
            onChange={(e) => setNewSound(e.target.value)}
            className="border p-2 rounded bg-base-100 text-primary h-11 w-44"
          >
            <option value="">Izvēlies skaņu</option>
            {availableSounds.map((sound, index) => (
              <option key={index} value={sound}>
                {sound}
              </option>
            ))}
          </select>
          <button onClick={addBellRing} className="btn btn-primary text-neutral ml-2">
            Pievienot
          </button>
        </div>
      </div>

      {currentTemplate.schedule.length > 0 && (
        <ul className="w-full max-w-md border rounded bg-base-100 text-primary">
          {currentTemplate.schedule.map((entry, index) => (
            <li
              key={index}
              className="py-2 px-4 border-b flex justify-between items-center"
            >
              {`${entry.time} (${entry.sound})`}
              <button
                onClick={() => removeBellRing(index)}
                className="text-red-500 ml-4"
              >
                Noņemt
              </button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={saveTemplate} className="btn btn-primary text-neutral mt-5">
        Saglabāt sarakstu
      </button>
    </div>
  );
}

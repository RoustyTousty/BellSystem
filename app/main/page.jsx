"use client";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [templates, setTemplates] = useState([]);
  const [activeTemplate, setActiveTemplate] = useState("");
  const [manualSound, setManualSound] = useState("");

  useEffect(() => {
    const fetchTemplates = async () => {
      const savedTemplates = await window.electronAPI.getTemplates();
      setTemplates(savedTemplates);
    };
    fetchTemplates();
  }, []);

  const activateTemplate = async (templateName) => {
    await window.electronAPI.activateTemplate(templateName);
    setActiveTemplate(templateName);
  };

  const playManualSound = async () => {
    if (!manualSound) return alert("Select a sound to play!");
    await window.electronAPI.playSound(manualSound);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Sound Scheduler</h1>
      <div>
        <h2 className="text-xl font-semibold mb-3">Select Active Template</h2>
        <select
          value={activeTemplate}
          onChange={(e) => activateTemplate(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Template</option>
          {templates.map((template, index) => (
            <option key={index} value={template.name}>
              {template.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-semibold mb-3">Manual Playback</h2>
        <select
          value={manualSound}
          onChange={(e) => setManualSound(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Sound</option>
          <option value="Smooth.mp3">Smooth.mp3</option>
          {/* Dynamically add sound options */}
        </select>
        <button
          onClick={playManualSound}
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Play Sound
        </button>
      </div>
    </div>
  );
}

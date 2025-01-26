"use client";
import { useEffect, useState } from "react";

export default function TemplateBuilder() {
  const [templates, setTemplates] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState({ name: "", schedule: [] });
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");

  useEffect(() => {
    const fetchTemplates = async () => {
      const savedTemplates = await window.electronAPI.getTemplates();
      setTemplates(savedTemplates);
    };
    fetchTemplates();
  }, []);

  const addTime = () => {
    if (!newStartTime || !newEndTime) {
      return alert("Lūdzu aizpildiet laika laukus!");
    }
    setCurrentTemplate((prev) => ({
      ...prev,
      schedule: [
        ...prev.schedule,
        { startTime: newStartTime, endTime: newEndTime },
      ],
    }));
    setNewStartTime("");
    setNewEndTime("");
  };

  const removeTime = (index) => {
    setCurrentTemplate((prev) => {
      const updatedSchedule = prev.schedule.filter((_, i) => i !== index);
      return { ...prev, schedule: updatedSchedule };
    });
  };

  const saveTemplate = async () => {
    if (!currentTemplate.name) return alert("Lūdzu nosauciet sarakstu!");
    if (currentTemplate.schedule.length === 0) return alert("Sarakstā ir jābūt vismaz vienam laika posmam!");
    await window.electronAPI.saveTemplate(currentTemplate);
    alert("Template saved successfully!");
  };

  const getListHeight = () => {
    const scheduleLength = currentTemplate.schedule.length;
    if (scheduleLength <= 4) {
      return `${scheduleLength * 48}px`;
    }
    return "192px";
  };

  return (
    <div className="p-5 bg-neutral text-primary h-screen overflow-visible flex flex-col items-center pt-20">
      <h1 className="text-4xl font-bold mb-10">Zvana Saraksta Izveidotājs</h1>

      <div className="mb-5 w-full max-w-md">
        <label className="block mb-2 text-xl font-semibold">Saraksta nosaukums:</label>
        <input
          type="text"
          value={currentTemplate.name}
          onChange={(e) => setCurrentTemplate({ ...currentTemplate, name: e.target.value })}
          className="border p-2 rounded w-full bg-base-100 text-primary"
        />
      </div>

      <div className="mb-5 w-full max-w-md">
        <label className="block text-xl font-semibold mb-2">Pievienot stundu laiku:</label>
        <div className="flex items-center justify-between">
          
          <h1 className="mr-2">No:</h1>
          
          <input
            type="time"
            value={newStartTime}
            onChange={(e) => setNewStartTime(e.target.value)}
            className="border p-2 rounded mr-2 bg-base-100 text-primary"
          />

          <h1 className="mr-2">Līdz:</h1>
          
          <input
            type="time"
            value={newEndTime}
            onChange={(e) => setNewEndTime(e.target.value)}
            className="border p-2 rounded mr-2 bg-base-100 text-primary"
          />

          <button
            onClick={addTime}
            className="btn btn-primary text-neutral"
          >
            Pievienot
          </button>
        </div>
      </div>

      {currentTemplate.schedule.length > 0 && (
        <div className="w-full max-w-md" style={{ height: getListHeight(), overflowY: "auto" }}>
          <ul>
            {currentTemplate.schedule
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map((item, index) => (
                <li key={index} className="py-2 px-2 border-b-2 border-base-100 flex justify-between items-center">
                  {item.startTime} - {item.endTime}
                  <button
                    onClick={() => removeTime(index)}
                    className="ml-2 text-red-500 font-semibold"
                  >
                    Noņemt
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}

      <button
        onClick={saveTemplate}
        className="btn btn-primary text-neutral mt-5"
      >
        Saglabāt sarakstu
      </button>
    </div>
  );
}

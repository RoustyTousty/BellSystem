"use client";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [templates, setTemplates] = useState([]);
  const [activeTemplate, setActiveTemplate] = useState("");
  const [manualSound, setManualSound] = useState("");
  const [currentAudio, setCurrentAudio] = useState(null);

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

  const playManualSound = () => {
    if (!manualSound) {
      alert("Select a sound to play!");
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const newAudio = new Audio(`/sounds/${manualSound}`);
    newAudio.play()
      .then(() => {
        console.log(`Playing: ${manualSound}`);
        setCurrentAudio(newAudio);
      })
      .catch((error) => {
        console.error("Error playing sound:", error);
        alert("Error playing the selected sound.");
      });

    newAudio.addEventListener("ended", () => {
      setCurrentAudio(null);
    });
  };

  return (
    <div className="p-5 bg-neutral text-primary h-screen overflow-hidden flex flex-col items-center pt-20">
      <h1 className="text-4xl font-bold mb-10">Sound Scheduler</h1>
      <div>
        <h2 className="text-xl font-semibold mb-3">Izvēlēties trafaretu</h2>
        <select
          value={activeTemplate}
          onChange={(e) => activateTemplate(e.target.value)}
          className="border p-2 rounded w-full bg-base-100 text-primary"
        >
          <option value="">Trafarets</option>
          {templates.map((template, index) => (
            <option key={index} value={template.name}>
              {template.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-5 flex flex-col adjust-center">
        <h2 className="text-xl font-semibold mb-3">Manualā atsaņošana</h2>
        <select
          value={manualSound}
          onChange={(e) => setManualSound(e.target.value)}
          className="border p-2 rounded w-full bg-base-100 text-primary"
        >
          <option value="">Izvēlēties Mūziku</option>
          <option value="Smooth.mp3">Smooth.mp3</option>
        </select>
        <button
          onClick={playManualSound}
          className="mtn-3 btn btn-primary text-neutral mt-5"
        >
          Atskaņot
        </button>
      </div>
    </div>
  );
}

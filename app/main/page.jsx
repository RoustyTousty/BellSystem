"use client";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [templates, setTemplates] = useState([]);
  const [activeTemplate, setActiveTemplate] = useState("");
  const [manualSound, setManualSound] = useState("");
  const [selectedMusic, setSelectedMusic] = useState("");
  const [currentAudio, setCurrentAudio] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [playedTimes, setPlayedTimes] = useState([]);
  const [soundTimeouts, setSoundTimeouts] = useState([]);
  const [availableSounds, setAvailableSounds] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const savedTemplates = await window.electronAPI.getTemplates();
      setTemplates(savedTemplates);
    };

    const fetchSounds = async () => {
      try {
        const sounds = await window.electronAPI.listSounds();
        setAvailableSounds(sounds);
      } catch (error) {
        console.error("Error fetching sounds:", error);
      }
    };

    fetchTemplates();
    fetchSounds();
  }, []);

  useEffect(() => {
    const savedTemplate = localStorage.getItem("selectedTemplate");

    if (savedTemplate && templates.length > 0) {
      setActiveTemplate(savedTemplate);
      const selectedTemplate = templates.find((template) => template.name === savedTemplate);

      if (selectedTemplate && selectedTemplate.schedule) {
        setSchedule(selectedTemplate.schedule);
        startTemplateTimer(selectedTemplate.schedule);
      }
    }
  }, [templates]);

  const activateTemplate = async (templateName) => {
    await window.electronAPI.activateTemplate(templateName);
    setActiveTemplate(templateName);

    localStorage.setItem("selectedTemplate", templateName);

    const selectedTemplate = templates.find((template) => template.name === templateName);

    if (selectedTemplate && selectedTemplate.schedule) {
      setSchedule(selectedTemplate.schedule);
      startTemplateTimer(selectedTemplate.schedule);
    }
  };

  const startTemplateTimer = (schedule) => {
    soundTimeouts.forEach((timeout) => clearTimeout(timeout));

    const newTimeouts = schedule.map((entry) => {
      const [hours, minutes] = entry.time.split(":");
      const targetTime = new Date();

      targetTime.setHours(hours, minutes, 0, 0);

      const timeDifference = targetTime.getTime() - new Date().getTime();

      if (timeDifference > 0 && !playedTimes.includes(entry.time)) {
        const timeoutId = setTimeout(() => {
          playTemplateSound(entry.fileName, entry.time);
        }, timeDifference);

        return timeoutId;
      }
      return null;
    });

    setSoundTimeouts(newTimeouts.filter((timeout) => timeout !== null));
  };

  const playTemplateSound = (fileName, time) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const newAudio = new Audio(`/sounds/${fileName}`);

    newAudio.play()
      .then(() => {
        console.log(`Playing: ${fileName}`);
        setCurrentAudio(newAudio);
        setPlayedTimes((prevPlayedTimes) => [...prevPlayedTimes, time]);

        setTimeout(() => {
          newAudio.pause();
          newAudio.currentTime = 0;
        }, 12500);
      })
      .catch((error) => {
        console.error("Error playing sound:", error);
        alert("Problem playing selected music.");
      });

    newAudio.addEventListener("ended", () => {
      setCurrentAudio(null);
    });
  };

  const playManualSound = () => {
    if (!manualSound) {
      alert("Please select a sound to play!");
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

        setTimeout(() => {
          newAudio.pause();
          newAudio.currentTime = 0;
        }, 12500);
      })
      .catch((error) => {
        console.error("Error playing sound:", error);
        alert("Problem playing selected music.");
      });

    newAudio.addEventListener("ended", () => {
      setCurrentAudio(null);
    });
  };

  const isTemplateAndMusicSelected = activeTemplate && selectedMusic;

  return (
    <div className="p-5 bg-neutral text-primary h-screen overflow-visible flex flex-col items-center pt-20">
      <h1 className="text-4xl font-bold mb-10">Atskaņošana</h1>

      <div className="mb-5 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-3">Saraksts:</h2>
        <select
          value={activeTemplate}
          onChange={(e) => activateTemplate(e.target.value)}
          className="border p-2 rounded w-full bg-base-100 text-primary"
        >
          <option value="">Izvēlēties sarakstu</option>
          {templates.map((template, index) => (
            <option key={index} value={template.name}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      {activeTemplate && (
        <div className="mb-5 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-3 mt-5">Izvēlieties mūziku:</h2>
          <select
            value={selectedMusic}
            onChange={(e) => setSelectedMusic(e.target.value)}
            className="border p-2 rounded w-full bg-base-100 text-primary"
          >
            <option value="">Izvēlēties mūziku</option>
            {availableSounds.map((sound, index) => (
              <option key={index} value={sound}>
                {sound}
              </option>
            ))}
          </select>
        </div>
      )}

      <div
        className={`badge ${isTemplateAndMusicSelected ? "bg-primary text-white" : "bg-gray-400 text-neutral"}`}
      >
        {isTemplateAndMusicSelected ? "Aktivizēts" : "Neaktīvs"}
      </div>

      <div className="mt-5 w-full max-w-md flex flex-col items-center">
        <h2 className="text-xl w-full font-semibold mb-3 mt-5">Manualā atskaņošana:</h2>
        <select
          value={manualSound}
          onChange={(e) => setManualSound(e.target.value)}
          className="border p-2 rounded w-full bg-base-100 text-primary"
        >
          <option value="">Izvēlēties Mūziku</option>
          {availableSounds.map((sound, index) => (
            <option key={index} value={sound}>
              {sound}
            </option>
          ))}
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

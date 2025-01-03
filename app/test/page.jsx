"use client";
import { useState } from "react";

export default function SchedulerApp() {
  const [templates, setTemplates] = useState([]);
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [newTemplate, setNewTemplate] = useState({ name: "", schedule: [] });
  const [newTime, setNewTime] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Fetch templates on load
  const fetchTemplates = async () => {
    const savedTemplates = await window.electronAPI.getTemplates();
    setTemplates(savedTemplates);
  };

  const addTemplate = async () => {
    if (!newTemplate.name) return alert("Template name cannot be empty!");
    await window.electronAPI.saveTemplate(newTemplate);
    setTemplates((prev) => [...prev, newTemplate]);
    setNewTemplate({ name: "", schedule: [] });
  };

  const activateTemplate = async (templateName) => {
    await window.electronAPI.activateTemplate(templateName);
    setActiveTemplate(templateName);
  };

  const addTimeToTemplate = () => {
    if (!newTime) return alert("Time cannot be empty!");
    setNewTemplate((prev) => ({
      ...prev,
      schedule: [...prev.schedule, { time: newTime, fileName: "" }],
    }));
    setNewTime("");
  };

  const deleteTemplate = async (templateName) => {
    await window.electronAPI.deleteTemplate(templateName);
    setTemplates((prev) => prev.filter((t) => t.name !== templateName));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-2xl font-bold mb-5">Sound Scheduler</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Template Management */}
        <div className="bg-white shadow-md p-5 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Manage Templates</h2>
          <div>
            <input
              type="text"
              placeholder="Template Name"
              className="border p-2 rounded w-full mb-2"
              value={newTemplate.name}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, name: e.target.value })
              }
            />
            <div className="flex items-center space-x-2">
              <input
                type="time"
                className="border p-2 rounded w-full"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
              <button
                onClick={addTimeToTemplate}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Time
              </button>
            </div>
            <ul className="mt-3">
              {newTemplate.schedule.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.time}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={addTemplate}
              className="mt-3 bg-green-500 text-white px-4 py-2 rounded w-full"
            >
              Save Template
            </button>
          </div>
        </div>

        {/* Activate Template */}
        <div className="bg-white shadow-md p-5 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Activate Template</h2>
          <ul>
            {templates.map((template, index) => (
              <li
                key={index}
                className={`p-3 rounded ${
                  activeTemplate === template.name
                    ? "bg-green-100"
                    : "bg-gray-100"
                } flex justify-between items-center`}
              >
                <span>{template.name}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => activateTemplate(template.name)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Activate
                  </button>
                  <button
                    onClick={() => deleteTemplate(template.name)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
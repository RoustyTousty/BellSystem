"use client";
import React, { useState, useEffect } from "react";

const MusicUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [musicList, setMusicList] = useState([]);

  // Fetch music files from the 'sounds' folder in the public directory
  useEffect(() => {
    const fetchMusicFiles = async () => {
      try {
        const response = await fetch("/Sounds");
        const files = await response.json();
        const formattedFiles = files.map((file) => ({ name: file, isPreloaded: true }));
        setMusicList(formattedFiles);
      } catch (error) {
        console.error("Error loading music files:", error);
      }
    };

    fetchMusicFiles();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return alert("Lūdzu izvēlieties failu, lai augšupielādētu!");

    const fileName = selectedFile.name;

    // Check if the file is already in the list
    if (musicList.some((music) => music.name === fileName)) {
      alert("Šis fails jau ir augšupielādēts!");
      return;
    }

    setMusicList((prev) => [...prev, { name: fileName, isPreloaded: false }]);
    alert(`Faila "${fileName}" augšupielāde pabeigta!`);
    setSelectedFile(null); // Reset the selected file after uploading
  };

  const handleRemove = (fileName) => {
    setMusicList((prev) => prev.filter((music) => music.name !== fileName));
  };

  return (
    <div className="p-5 bg-neutral text-primary h-screen overflow-visible flex flex-col items-center pt-20">
      <h1 className="text-4xl font-bold mb-10">Mūzikas Augšupielādētājs</h1>

      {/* File Upload Input */}
      <div className="mb-5 w-full max-w-md">
        <label className="block text-xl font-semibold mb-2">Augšupielādēt mūziku:</label>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          className="border p-2 rounded w-full bg-base-100 text-primary"
        />
      </div>

      {/* Selected File Information */}
      {selectedFile && (
        <div className="w-full max-w-md mb-5 p-3 border rounded bg-base-100 text-primary flex justify-between items-center">
          <span>{selectedFile.name}</span>
          <button
            onClick={() => setSelectedFile(null)}
            className="text-red-500 font-semibold"
          >
            Noņemt
          </button>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="btn btn-primary text-neutral mb-5"
        disabled={!selectedFile}
      >
        Augšupielādēt
      </button>

      {/* List of Uploaded Music */}
      {musicList.length > 0 && (
        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold mb-3">Mūzikas Saraksts:</h2>
          <ul
            className="border rounded bg-base-100 text-primary max-h-48 overflow-y-auto"
            style={{
              maxHeight: "12rem", // Limit to 4 items before scrolling
              padding: "0.5rem",
            }}
          >
            {musicList.map((music, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2 px-3 border-b"
              >
                <span>
                  {music.name} {music.isPreloaded ? "(Preloaded)" : ""}
                </span>
                <button
                  onClick={() => handleRemove(music.name)}
                  className="text-red-500 font-semibold"
                >
                  Noņemt
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MusicUploader;

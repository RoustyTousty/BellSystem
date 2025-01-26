'use client';
import React, { useState, useEffect } from "react";

const MusicUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [musicList, setMusicList] = useState([]);

  useEffect(() => {
    const fetchMusicFiles = async () => {
      try {
        const files = await window.electronAPI.listSounds();
        setMusicList(files);
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

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file to upload!");
  
    const fileReader = new FileReader();
    fileReader.onload = async (event) => {
      const fileBuffer = event.target.result;
  
      try {
        await window.electronAPI.saveSound(fileBuffer, selectedFile.name);
        alert(`File "${selectedFile.name}" uploaded successfully!`);
        setSelectedFile(null);
  
        // Refresh the music list
        const files = await window.electronAPI.listSounds();
        setMusicList(files);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("File upload failed!");
      }
    };
  
    fileReader.onerror = () => {
      console.error("Error reading file");
      alert("Failed to read the file!");
    };
  
    fileReader.readAsArrayBuffer(selectedFile);
  };  

  const handleRemove = async (fileName) => {
    try {
      await window.electronAPI.deleteSound(fileName);
      setMusicList((prev) => prev.filter((music) => music !== fileName));
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete the file!");
    }
  };

  return (
    <div className="p-5 bg-neutral text-primary h-screen overflow-visible flex flex-col items-center pt-20">
      <h1 className="text-4xl font-bold mb-10">Pievienot audio</h1>

      <div className="mb-5 w-full max-w-md">
        <label className="block text-xl font-semibold mb-2">Augšuplādēt audio failu:</label>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          className="border p-2 rounded w-full bg-base-100 text-primary"
        />
      </div>

      {selectedFile ? (
        <button
          onClick={handleUpload}
          className="btn btn-primary text-neutral mb-5"
        >
          Augšuplādēt
        </button>
      ) : (
        <button
          className="btn border bg-base-100 text-primary cursor-not-allowed mb-5"
        >
          Augšuplādēt
        </button>
      )}

      {musicList.length > 0 && (
        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold mb-3">Visi audio:</h2>
          <ul className="border rounded bg-base-100 text-primary max-h-48 overflow-y-auto">
            {musicList.map((music, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2 px-3 border-b"
              >
                <span>{music}</span>
                <button
                  onClick={() => handleRemove(music)}
                  className="mr-2 text-red-500 font-semibold"
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

// components/MusicUploader.js
'use client';
import React, { useState, useEffect } from 'react';

const MusicUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [musicList, setMusicList] = useState([]);

  useEffect(() => {
    const fetchMusicFiles = async () => {
      try {
        const response = await fetch('/api/music');
        const files = await response.json();
        setMusicList(files);
      } catch (error) {
        console.error('Error loading music files:', error);
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
    if (!selectedFile) return alert('Please select a file to upload!');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert(`File "${selectedFile.name}" uploaded successfully!`);
        setSelectedFile(null);
        // Refresh the music list
        const filesResponse = await fetch('/api/music');
        const files = await filesResponse.json();
        setMusicList(files);
      } else {
        alert('File upload failed!');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('File upload failed!');
    }
  };

  const handleRemove = async (fileName) => {
    try {
      const response = await fetch(`/api/music?file=${fileName}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMusicList((prev) => prev.filter((music) => music !== fileName));
      } else {
        alert('Failed to delete the file!');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete the file!');
    }
  };

  return (
    <div className="p-5 bg-neutral text-primary h-screen overflow-visible flex flex-col items-center pt-20">
      <h1 className="text-4xl font-bold mb-10">Pievienot mūziku</h1>

      <div className="mb-5 w-full max-w-md">
        <label className="block text-xl font-semibold mb-2">Augšuplādēt mūzikas failu:</label>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          className="border p-2 rounded w-full bg-base-100 text-primary"
        />
      </div>

      {selectedFile && (
        <div className="w-full max-w-md mb-5 p-3 border rounded bg-base-100 text-primary flex justify-between items-center">
          <span>{selectedFile.name}</span>
          <button
            onClick={() => setSelectedFile(null)}
            className="text-red-500 font-semibold"
          >
            noņemt
          </button>
        </div>
      )}

      <button
        onClick={handleUpload}
        className="btn btn-primary text-neutral mb-5"
        disabled={!selectedFile}
      >
        Augšuplādēt
      </button>

      {musicList.length > 0 && (
        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold mb-3">Music List:</h2>
          <ul className="border rounded bg-base-100 text-primary max-h-48 overflow-y-auto">
            {musicList.map((music, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-2 px-3 border-b"
              >
                <span>{music}</span>
                <button
                  onClick={() => handleRemove(music)}
                  className="text-red-500 font-semibold"
                >
                  Remove
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

"use client"

export default function Home() {
    const handleSaveAudio = async () => {
        await window.electronAPI.saveAudioFile('example.mp3', 'audio data here');
    };

    const handleDeleteAudio = async () => {
        console.log("tt");
        await window.electronAPI.deleteAudioFile('example.mp3');
        console.log("Test");
    };

    const handleGetAudioFiles = async () => {
        const files = await window.electronAPI.getAudioFiles();
        console.log(files);
    };

    return (
        <div>
            <h1>HELLO</h1>
            <button onClick={handleSaveAudio}>Save Audio</button>
            <button onClick={handleDeleteAudio}>Delete Audio</button>
            <button onClick={handleGetAudioFiles}>Get Audio Files</button>
        </div>
    );
}
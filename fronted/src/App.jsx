import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Select file");

    const formData = new FormData();
    formData.append("audio", file); // must match backend key

    try {
      const response = await fetch("http://127.0.0.1:5000/upload-audio", {
        method: "POST",
        body: formData, // do NOT set Content-Type manually
      });

      const data = await response.json();
      console.log("Response from backend:", data);

      // <-- FIX: use "text" key, not "transcription"
      setResult(data.text);
    } catch (err) {
      console.error("Upload failed:", err);
      setResult("Error uploading or transcribing file");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Speech To Text App</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br /><br />

      <button onClick={handleUpload}>Upload & Transcribe</button>

      <h3>Transcription Result:</h3>
      <p>{result}</p>
    </div>
  );
}

export default App;

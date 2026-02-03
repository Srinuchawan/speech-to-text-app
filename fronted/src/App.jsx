
//                                working  

// import { useState, useEffect } from "react";
// import { supabase } from "./supabaseClient";
// import Auth from "./Auth";

// function App() {
//   const [user, setUser] = useState(null);
//   const [file, setFile] = useState(null);
//   const [result, setResult] = useState("");
//   const [history, setHistory] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState("");

//   // 🔹 Auth listener
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data }) => {
//       setUser(data.session?.user ?? null);
//     });

//     const { data: listener } =
//       supabase.auth.onAuthStateChange((_event, session) => {
//         setUser(session?.user ?? null);
//       });

//     return () => {
//       listener.subscription.unsubscribe();
//     };
//   }, []);

//   // 🔹 Fetch history after login
//   useEffect(() => {
//     if (!user) return;

//     const fetchHistory = async () => {
//       try {
//         const res = await fetch(`http://127.0.0.1:5000/history/${user.id}`);
//         if (!res.ok) throw new Error("Failed to fetch history");

//         const data = await res.json();
//         setHistory(
//           data.map((item) => ({
//             text: item.transcription,
//             time: new Date(item.uploadedAt).toLocaleString(),
//           }))
//         );
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchHistory();
//   }, [user]);

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select an audio file");
//       return;
//     }

//     try {
//       setLoading(true);
//       setStatus("Uploading audio...");

//       const formData = new FormData();
//       formData.append("audio", file);

//       const res = await fetch("http://localhost:5000/upload-audio", {
//         method: "POST",
//         body: formData,
//       });

//       setStatus("Transcribing audio...");
//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Transcription failed");
//       }

//       setResult(data.transcription);
//       setStatus("✅ Transcription completed");
//     } catch (err) {
//       setStatus("❌ Failed to transcribe audio");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setUser(null);
//     setHistory([]);
//     setResult("");
//     setError("");
//   };

//   // 🔹 Show Auth page
//   if (!user) return <Auth setUser={setUser} />;

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>🎤 Welcome, {user.email}</h2>
//         <button onClick={handleLogout} style={styles.button}>Logout</button>

//         <input
//           type="file"
//           accept="audio/*"
//           onChange={(e) => setFile(e.target.files[0])}
//           style={styles.input}
//         />

//         <button
//           onClick={handleUpload}
//           disabled={loading}
//           style={{
//             backgroundColor: loading ? "#999" : "#2563eb",
//             cursor: loading ? "not-allowed" : "pointer",
//           }}
//         >
//           {loading ? "Please wait..." : "Upload & Transcribe"}
//         </button>

//         {status && <p>{status}</p>}
//         {error && <p style={styles.error}>{error}</p>}
//         {result && <p style={styles.result}>{result}</p>}

//         {history.length > 0 && (
//           <>
//             <h3>History</h3>
//             {history.map((item, idx) => (
//               <div key={idx}>
//                 <small>{item.time}</small>
//                 <p>{item.text}</p>
//               </div>
//             ))}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f3f4f6" },
//   card: { background: "#fff", padding: "25px", width: "420px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
//   title: { textAlign: "center", marginBottom: "15px" },
//   input: { width: "100%", marginBottom: "12px" },
//   button: { width: "100%", padding: "10px", marginBottom: "10px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" },
//   error: { color: "red" },
//   result: { background: "#f9fafb", padding: "10px", borderRadius: "6px" },
// };

// export default App;






                           //Work if shows  TRANSCRIBE ERROR FAILED

// import { useState } from "react";

// function App() {
//   const [file, setFile] = useState(null);
//   const [result, setResult] = useState("");
//   const [error, setError] = useState("");
//   const [history, setHistory] = useState([]);

//   const handleUpload = async () => {
//     setError("");
//     setResult("");

//     if (!file) {
//       setError("Please select an audio file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("audio", file); // must match backend key

//     try {
//       const response = await fetch("http://127.0.0.1:5000/upload-audio", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Server error");
//       }

//       const data = await response.json();

//       setResult(data.text);

//       // ✅ Save to history
//       setHistory((prev) => [
//         ...prev,
//         {
//           text: data.text,
//           time: new Date().toLocaleString(),
//         },
//       ]);
//     } catch (err) {
//       console.error(err);
//       setError("Error uploading or transcribing file");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Speech To Text App</h2>

//       <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//       <br /><br />

//       <button onClick={handleUpload}>Upload & Transcribe</button>

//       {/* ✅ Error Message */}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <h3>Transcription Result:</h3>
//       <p>{result}</p>

//       {/* ✅ History UI */}
//       {history.length > 0 && (
//         <>
//           <h3>History</h3>
//           <ul>
//             {history.map((item, index) => (
//               <li key={index}>
//                 <strong>{item.time}</strong>
//                 <br />
//                 {item.text}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;


//                   temparary
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import axios from "axios";

// ✅ Use deployed backend URL
const api = axios.create({
  baseURL: "https://speech-to-text-backend.onrender.com", // Replace with your Render backend URL
});

function App() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // 🔹 Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // 🔹 Fetch history after login
  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      try {
        const { data } = await api.get(`/history/${user.id}`);
        setHistory(
          data.map((item) => ({
            text: item.transcription,
            time: new Date(item.uploadedAt).toLocaleString(),
          }))
        );
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch history");
      }
    };

    fetchHistory();
  }, [user]);

  // 🔹 Upload and transcribe audio
  const handleUpload = async () => {
    if (!file) {
      alert("Please select an audio file");
      return;
    }

    try {
      setLoading(true);
      setStatus("Uploading audio...");
      setError("");
      setResult("");

      const formData = new FormData();
      formData.append("audio", file);

      const { data } = await api.post("/upload-audio", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(data.transcription);
      setStatus("✅ Transcription completed");

      // ✅ Add to history
      setHistory((prev) => [
        ...prev,
        {
          text: data.transcription,
          time: new Date().toLocaleString(),
        },
      ]);
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to transcribe audio");
      setError(err.response?.data?.message || err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setHistory([]);
    setResult("");
    setError("");
    setStatus("");
  };

  // 🔹 Show Auth page if not logged in
  if (!user) return <Auth setUser={setUser} />;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎤 Welcome, {user.email}</h2>
        <button onClick={handleLogout} style={styles.button}>Logout</button>

        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.input}
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#999" : "#2563eb",
            cursor: loading ? "not-allowed" : "pointer",
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
          }}
        >
          {loading ? "Please wait..." : "Upload & Transcribe"}
        </button>

        {status && <p>{status}</p>}
        {error && <p style={styles.error}>{error}</p>}
        {result && <p style={styles.result}>{result}</p>}

        {history.length > 0 && (
          <>
            <h3>History</h3>
            {history.map((item, idx) => (
              <div key={idx}>
                <small>{item.time}</small>
                <p>{item.text}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f4f6",
  },
  card: {
    background: "#fff",
    padding: "25px",
    width: "420px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    marginBottom: "12px",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  error: { color: "red" },
  result: {
    background: "#f9fafb",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px",
  },
};

export default App;

// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import multer from "multer";
// import fs from "fs";
// import cors from "cors";
// import OpenAI from "openai";
// import Audio from "./models/Audio.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// /* =======================
//    MongoDB Connection
// ======================= */
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err.message));

// /* =======================
//    OpenAI Client
// ======================= */
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// /* =======================
//    Upload Folder
// ======================= */
// const uploadDir = "uploads";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// /* =======================
//    Multer Configuration
// ======================= */
// const storage = multer.diskStorage({
//   destination: (_, __, cb) => cb(null, uploadDir),
//   filename: (_, file, cb) =>
//     cb(null, `${Date.now()}-${file.originalname}`),
// });

// const upload = multer({ storage });

// /* =======================
//    Test Route
// ======================= */
// app.get("/", (_, res) => {
//   res.send("Backend is running 🚀");
// });

// /* =======================
//    Upload + Transcribe
// ======================= */
// app.post("/upload-audio", upload.single("audio"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No audio file uploaded" });
//     }

//     const userId = req.body.userId || null;
//     const audioPath = req.file.path;

//     console.log("🎧 Audio received:", audioPath);

//     // 🧠 Transcribe using OpenAI Whisper API
//     const transcriptionResult = await openai.audio.transcriptions.create({
//       file: fs.createReadStream(audioPath),
//       model: "whisper-1",
//     });

//     const transcription = transcriptionResult.text.trim();

//     // Save to MongoDB
//     const audio = new Audio({
//       filename: req.file.filename,
//       filepath: audioPath,
//       transcription,
//       userId,
//     });

//     await audio.save();

//     // Delete file after transcription (optional)
//     fs.unlinkSync(audioPath);

//     res.json({
//       message: "✅ Audio uploaded & transcribed",
//       transcription,
//     });
//   } catch (err) {
//     console.error("Transcription Error:", err);
//     res.status(500).json({
//       message: "Transcription failed",
//       error: err.message,
//     });
//   }
// });

// /* =======================
//    Get User History
// ======================= */
// app.get("/history/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const data = await Audio.find({ userId }).sort({ uploadedAt: -1 });
//     res.json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: "Failed to fetch history",
//       error: err.message,
//     });
//   }
// });

// /* =======================
//    Server Start
// ======================= */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
// 2/4/2026  audio tarnscribe














// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import multer from "multer";
// import fs from "fs";
// import cors from "cors";
// import { exec } from "child_process";

// // import OpenAI from "openai";
// import Audio from "./models/Audio.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());


// /* =======================
//    MongoDB Connection
// ======================= */
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ Local MongoDB Connected"))
//   .catch((err) => console.log("❌ MongoDB Error:", err.message));

// /* =======================
//    OpenAI Configuration
// ======================= */

// //  if want Online transcription uncomment below

// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// /* =======================
//    Upload Folder
// ======================= */
// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// }

// /* =======================
//    Multer Configuration
// ======================= */
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// /* =======================
//    TEST ROUTE (IMPORTANT)
// ======================= */
// app.get("/", (req, res) => {
//   res.send("Backend is running 🚀");
// });

// /* =======================
//    AUDIO UPLOAD ROUTE
// ======================= */

//   //OFFLINE api postman

// app.post("/upload-audio", upload.single("audio"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No audio file uploaded" });
//     }

//     const audioPath = req.file.path;

//     exec(`python transcribe.py "${audioPath}"`, async (error, stdout) => {
//       if (error) {
//         return res.status(500).json({ message: "Whisper failed", error: error.message });
//       }

//       const audio = new Audio({
//         filename: req.file.filename,
//         filepath: audioPath,
//         transcription: stdout,
//       });

//       await audio.save();

//       res.json({
//         message: "Audio uploaded & transcribed (Offline Whisper)",
//         transcription: stdout,
//       });
//     });

//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });


//   /* Online api  -

// app.post("/upload-audio", upload.single("audio"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No audio file uploaded" });
//     }
//    */
//         //online

//     // const transcription = await openai.audio.transcriptions.create({
//     //   file: fs.createReadStream(req.file.path),
//     //   model: "whisper-1",
//     // });

// //     const audio = new Audio({
// //       filename: req.file.filename,
// //       filepath: req.file.path,
// //       transcription: transcription.text,
// //     });

// //     await audio.save();

// //     res.json({
// //       message: "Audio uploaded, transcribed & saved",
// //       transcription: transcription.text,
// //     });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({
// //       message: "Whisper failed",
// //       error: err.message,
// //     });
// //   }
// // });

// /* =======================
//    SERVER START
// ======================= */
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });







// temparary
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import cors from "cors";
import OpenAI from "openai";
import Audio from "./models/Audio.js";

dotenv.config();

const app = express();

/* =======================
   Middleware
======================= */
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* =======================
   MongoDB Connection
======================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));

/* =======================
   OpenAI Client
======================= */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* =======================
   Render-Safe Upload Folder
======================= */
const uploadDir = "/tmp/uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* =======================
   Multer Configuration
======================= */
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (_, file, cb) => {
    if (!file.mimetype.startsWith("audio/")) {
      return cb(new Error("Only audio files are allowed"));
    }
    cb(null, true);
  },
});

/* =======================
   Health Check
======================= */
app.get("/", (_, res) => {
  res.send("Backend is running 🚀");
});

/* =======================
   Upload + Transcribe
======================= */
app.post("/upload-audio", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No audio file uploaded" });
    }

    const userId = req.body.userId || null;
    const audioPath = req.file.path;

    console.log("🎧 Audio received:", audioPath);
    console.log("📦 MIME:", req.file.mimetype);
    console.log("📏 Size:", req.file.size);

    // 🧠 Transcribe with OpenAI Whisper
    const transcriptionResult =
      await openai.audio.transcriptions.create({
        file: fs.createReadStream(audioPath),
        model: "whisper-1",
      });

    const transcription = transcriptionResult.text.trim();

    // Save to MongoDB
    const audio = new Audio({
      filename: req.file.filename,
      filepath: audioPath,
      transcription,
      userId,
    });

    await audio.save();

    // Clean up temp file
    fs.unlinkSync(audioPath);

    res.json({
      message: "✅ Audio uploaded & transcribed",
      transcription,
    });
  } catch (err) {
    console.error("❌ Transcription Error:", err);

    // Prevent leaked temp files
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      message: "Transcription failed",
      error: err.message,
    });
  }
});

/* =======================
   User History
======================= */
app.get("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await Audio.find({ userId }).sort({ uploadedAt: -1 });
    res.json(data);
  } catch (err) {
    console.error("❌ History Error:", err);
    res.status(500).json({
      message: "Failed to fetch history",
      error: err.message,
    });
  }
});

/* =======================
   Server Start
======================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

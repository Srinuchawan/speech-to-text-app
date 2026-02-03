# 🎤 Speech-to-Text Web Application (Internship Project)

A full-stack **Speech-to-Text Web Application** developed as part of an internship project.  
This application allows users to **authenticate**, **upload audio files**, and **convert speech into text** using **Offline Whisper** and **Online OpenAI Whisper**, with transcription history stored securely in **MongoDB Atlas (Cloud)**.

---

## 🚀 Quick Overview

| Aspect | Technology |
|------|-----------|
| Frontend | React + Vite |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas (Online) |
| Authentication | Supabase Email OTP |
| Speech-to-Text (Offline) | OpenAI Whisper (Python) |
| Speech-to-Text (Online) | OpenAI Whisper API |
| File Upload | Multer |
| Version Control | Git & GitHub |

---

## 🧰 Technology Stack

### Frontend
- React (Hooks-based)
- Vite (Fast dev server)
- CSS (Custom styling)
- Supabase JS SDK (Authentication)
- Fetch API (Backend communication)

---

### Backend
- Node.js
- Express.js
- Multer (Audio upload handling)
- Mongoose (MongoDB ODM)
- dotenv (Environment variables)
- child_process (`exec`) for offline Whisper
- CORS (Cross-Origin requests)

---

### Database (MongoDB Atlas – Cloud)

#### Audio Schema
```js
{
  filename: String,
  filepath: String,
  transcription: String,
  userId: String,
  createdAt: Date,
  updatedAt: Date
}
📁 Project Structure
Frontend (/fronted)

src/
├── App.jsx                # Main application logic
├── Auth.jsx               # Authentication UI (Supabase)
├── supabaseClient.js      # Supabase configuration
├── main.jsx               # React entry point
└── styles.css             # UI styling

Backend (/backend)

models/
├── Audio.js               # MongoDB schema

uploads/
├── *.mp3 / *.wav          # Uploaded audio files

index.js                   # Express server
transcribe.py              # Offline Whisper transcription
whisper.js                 # OpenAI Whisper (Online)
.env                       # Environment variables

✨ Key Features

✅ Email OTP Authentication (Supabase)
✅ Audio upload (MP3 / WAV)
✅ Offline Speech-to-Text using Whisper
✅ Online Speech-to-Text using OpenAI API
✅ User-specific transcription history
✅ MongoDB Atlas cloud database
✅ Error handling & validation
✅ Secure environment configuration

🔐 Environment Variables

Backend (.env)

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/speechToText
OPENAI_API_KEY=your_openai_api_key

Frontend (.env)

VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key


Online Whisper (OpenAI)

Uses OpenAI Whisper API

Faster & scalable

Requires API key

Suitable for production

🛠 Implementation Timeline
Day	Work Done
Day 1	Project setup & planning
Day 2	Backend setup (Express, MongoDB)
Day 3	File upload with Multer
Day 4	Offline Whisper integration
Day 5	MongoDB data storage
Day 6	React frontend
Day 7	Audio upload UI
Day 8	Supabase authentication
Day 9	User-based history
Day 10	Error handling
Day 11	Debugging & fixes
Day 12	Integration testing
Day 13	UI polish
Day 14	Documentation


🧩 Challenges Solved

Whisper file path errors (ENOENT)

React invalid hook call issues

Multer upload validation

Supabase email OTP delays

MongoDB Atlas connection issues

CORS & network errors

📚 Skills & Learnings
Full-Stack Development

Client-server architecture

REST API development

Authentication flows

Backend

Express middleware

MongoDB Atlas integration

File handling with Multer

Offline ML integration

Frontend

React hooks (useState, useEffect)

Conditional rendering

API handling

DevOps & Tools

Git & GitHub

Environment variable management

Debugging production issues

📊 Project Statistics

Development Duration: 14 Days

Backend APIs: 5+

React Components: 6+

Technologies Used: 10+

Database: MongoDB Atlas


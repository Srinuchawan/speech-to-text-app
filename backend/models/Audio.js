import mongoose from "mongoose";

const audioSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
  transcription: String,
  uploadedAt: { type: Date, default: Date.now },
  userId: String, // ✅ Add this
});

export default mongoose.model("Audio", audioSchema);

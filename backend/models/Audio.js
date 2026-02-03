// import mongoose from "mongoose";

// const audioSchema = new mongoose.Schema({
//   filename: String,
//   filepath: String,
//   transcription: String,
//   uploadedAt: { type: Date, default: Date.now },
//   userId: String, // ✅ Add this
// });

// export default mongoose.model("Audio", audioSchema);

import mongoose from "mongoose";

const audioSchema = new mongoose.Schema(
  {
    filename: String,
    filepath: String,
    transcription: String,
    userId: String,
  },
  { timestamps: true }
);

export default mongoose.model("Audio", audioSchema);

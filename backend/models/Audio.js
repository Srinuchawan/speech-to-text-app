import mongoose from "mongoose";

const audioSchema = new mongoose.Schema({
  filename: String,
  path: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Audio", audioSchema);

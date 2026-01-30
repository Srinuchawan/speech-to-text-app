import whisper
import os
import uuid
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load Whisper ONCE
model = whisper.load_model("base")

@app.route("/upload-audio", methods=["POST"])
def upload_audio():
    try:
        print("Request files:", request.files)   # <<< ADD THIS
        if "audio" not in request.files:
            return jsonify({"message": "No audio file uploaded"}), 400

        audio_file = request.files["audio"]
        print("Received file:", audio_file.filename)

        # Save temporarily
        import uuid
        filename = f"{uuid.uuid4()}.mp3"
        file_path = os.path.join(os.getcwd(), filename)
        audio_file.save(file_path)
        print("Saved to:", file_path)

        # Transcribe
        result = model.transcribe(file_path)
        print("Transcription done:", result["text"])

        os.remove(file_path)
        return jsonify({"text": result["text"]})

    except Exception as e:
        print("🔥 BACKEND ERROR:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)

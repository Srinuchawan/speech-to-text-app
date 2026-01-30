import requests

file_path = r"C:\Users\yashc\OneDrive\INTERNSHIP PROJECT\speech-to-text-app\backend\uploads\1769584241126-English_Mastery_Formula.mp3"

with open(file_path, "rb") as f:
    files = {"audio": f}
    response = requests.post("http://127.0.0.1:5000/upload-audio", files=files)
    print(response.json())

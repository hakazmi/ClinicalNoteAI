# 🩺 Clinical Note Generator

AI-powered system for converting **doctor–patient conversation audio** into **structured clinical notes**, using a **FastAPI backend**, **Google Colab inference**, and a **React frontend** — powered by a **fine-tuned LLM for medical context**.

---

## 📌 Overview

The **Clinical Note Generator** automates the process of generating medical notes from audio recordings.

This project combines:

- ⚛️ **React Frontend (TypeScript)** — for uploading audio and displaying generated notes  
- ⚡ **FastAPI Backend** — running inside **Google Colab** via **VSCode**  
- 🧠 **Fine-tuned LLM (Phi-4)** — customized on **doctor–patient dialogue datasets** for clinical note generation  
- 🌐 **ngrok** — to expose backend endpoints to the frontend  
- 🧩 **VSCode + Google Colab Extension** — for seamless integration

This setup allows you to run **large models on Colab (GPU)** while keeping the **full-stack project locally** in VSCode.

---

## 🧠 How It Works (Process Flow)

1️⃣ **User uploads audio** from the React frontend  
➡️ The frontend sends the file to the backend API using the ngrok URL.

2️⃣ **FastAPI backend receives the audio**
- Validates the input
- Saves it temporarily
- Sends the audio to the **AI model** running in Colab

3️⃣ **Model generates the clinical note**
- Colab notebook:
  - Performs **speech-to-text transcription**
  - Passes the transcribed text into a **fine-tuned Phi-4 model**
  - Model generates and structures the **clinical note**

4️⃣ **Backend returns the generated note**  
➡️ FastAPI sends the structured note to the frontend.

5️⃣ **Frontend displays the result**
- **Generated Clinical Note**
- **Structured fields:** Chief Complaint, Assessment, Plan, etc.


---

## 🚀 Running the Project Locally (Step-by-Step)

### ✅ Prerequisites

- VSCode  
- Google Colab VSCode Extension  
- Node.js (for frontend)  
- Python 3.10+ (for backend)  
- ngrok account (free tier works)

---

### 🟦 Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/clinical-note-generator.git
cd clinical-note-generator
```
### 🟨 Step 2 — Open the Colab Notebook in VSCode
- Install the Google Colab VSCode Extension
- Open the project in VSCode
- Open the notebook: model_inference.ipynb
- Connect to Colab GPU runtime
- Run all cells sequentially
### 🟧 Step 3 — Copy the ngrok Public URL
- The last notebook cell prints something like:

```bash

https://1234abcd.ngrok-free.app
```
- Copy this URL — it’s your backend endpoint.

### 🟥 Step 4 — Paste ngrok URL into the Frontend
- Open: frontend/src/app.tsx
- Update the API endpoint:

```bash

const API_BASE_URL = "https://1234abcd.ngrok-free.app";
```
- Save the file.

### 🟩 Step 5 — Run the Frontend
```bash

cd frontend
npm install
npm run dev
```
- Your application will be live at:
- 👉 http://localhost:5173

- Upload an audio file and watch it generate a structured clinical note.

### 🟪 Step 6 — FastAPI Backend (Runs Automatically Through Colab)
- No need to start the backend locally —
- FastAPI runs inside the Colab notebook, and ngrok exposes it publicly.

## 🧩 Tech Stack
### Frontend
- React (TypeScript)
- Tailwind CSS
- Axios
### Backend
- FastAPI
- Python 3.10
- Pydantic
- ngrok
### ML & Inference
- Google Colab GPU
- Fine-tuned Phi-4 LLM for clinical note generation
- Hugging Face Transformers
- Speech Recognition (ASR) for transcription
- Custom processing pipeline for doctor–patient dialogue → structured notes
  
## 🧠 LLM Details
- The heart of this project is a fine-tuned Phi-4 model.
- It was trained specifically on doctor–patient dialogue datasets to:
- Understand medical conversations
- Identify clinically relevant sections
- Generate structured, professional-grade clinical notes
- This fine-tuning gives the model a strong ability to produce clear, formatted, and semantically accurate notes aligned with clinical documentation standards.




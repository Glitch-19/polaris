# 🧠 Amnesia AI - The AI That Forgets to Feel Alive

An emotionally intelligent AI chatbot platform with Instagram-inspired profile interface, voice cloning capabilities, and the Pratfall Effect built-in to create genuine human connections.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Python](https://img.shields.io/badge/python-3.9+-green)
![React](https://img.shields.io/badge/react-18.2-blue)
![FastAPI](https://img.shields.io/badge/fastapi-0.104-teal)

---

## 💡 The Concept

**"Perfection is robotic. Flaws are human."**

Amnesia is an AI companion platform designed around the **Pratfall Effect** — a psychological principle showing that people (or AI) become more likable when they make small, relatable mistakes.

Instead of striving for perfection, Amnesia AIs:
- **Occasionally forget** user details (pet names, favorites, etc.)
- **React warmly** when corrected ("Oh no, I always mix that up! 😅")
- **Build relationships** where users become caregivers, teachers, or friends
- **Speak with cloned voices** using uploaded audio samples

---

## ✨ Features

### 🎭 AI Profile System
- **Instagram-inspired profiles** with avatars, descriptions, and creator credits
- **Custom personalities** via detailed prompts
- **Scenes/Roleplay** support for interactive storytelling
- **Voice cloning** using Coqui TTS (upload audio → AI speaks in that tone)

### 💬 Emotional Chat Interface
- **Streaming text** with character-by-character display
- **Typing indicators** with animated dots
- **Pratfall moments** flagged with 💭 "Oops, memory lapse..."
- **Voice responses** with one-click playback

### 🧠 Memory Management
- **Automatic memory extraction** from conversations
- **User-controlled memory deletion** (privacy-first)
- **Confidence decay** over time (memories fade naturally)
- **Memory viewer** showing what the AI remembers about you

### 🎨 Meta AI Studio-Inspired UI
- Profile header with avatar and creator info
- Scenes section for roleplay scenarios
- AI Studio configuration view
- Accuracy disclaimer (AI may be wrong/inappropriate)
- Memory database viewer

---

## 🏗️ Architecture

```
amnesia-ai/
├── backend/                    # FastAPI server
│   ├── main.py                # App entry point
│   ├── database.py            # SQLAlchemy setup
│   ├── models/
│   │   └── models.py          # Database models
│   ├── routers/
│   │   ├── profiles.py        # AI profile CRUD
│   │   ├── chat.py            # Chat endpoints
│   │   └── memories.py        # Memory management
│   ├── services/
│   │   ├── ai_service.py      # LangChain/OpenAI logic
│   │   └── voice_service.py   # TTS voice cloning
│   └── static/audio/          # Uploaded/generated audio
├── frontend/                  # React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProfileList.jsx
│   │   │   ├── AIProfile.jsx
│   │   │   └── ChatInterface.jsx
│   │   ├── services/
│   │   │   └── api.js         # Axios API client
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
├── .env                       # Environment variables (not committed)
├── .env.example               # Example config
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- **Python 3.9+** installed
- **Node.js 18+** and npm
- **Groq API key** ([get one here](https://console.groq.com/keys))

### 1️⃣ Clone & Setup

```cmd
cd C:\Users\91885\OneDrive\Desktop\avehi
```

### 2️⃣ Backend Setup

```cmd
REM Activate virtual environment
.venv\Scripts\activate

REM Install Python dependencies
cd backend
pip install -r requirements.txt

REM Copy and configure .env
copy ..\.env.example ..\.env
REM Edit .env and add your GROQ_API_KEY

REM Start the backend server
cd ..
python backend/main.py
```

Backend will run at **http://localhost:8000**

### 3️⃣ Frontend Setup (in a new terminal)

```cmd
cd C:\Users\91885\OneDrive\Desktop\avehi\frontend

REM Install dependencies
npm install

REM Start development server
npm run dev
```

Frontend will run at **http://localhost:5173**

### 4️⃣ Open Your Browser

Visit **http://localhost:5173** and you'll see:
- AI profile creation form
- Instagram-style profile pages
- Chat interface with voice responses

---

## 📝 Configuration (.env)

```env
# Groq API key (REQUIRED)
GROQ_API_KEY=gsk-your-key-here

# Database
DATABASE_URL=sqlite:///./amnesia.db

# Server
HOST=0.0.0.0
PORT=8000
DEBUG=True

# AI Behavior
PRATFALL_PROBABILITY=0.15        # 15% chance to "forget"
MEMORY_DECAY_DAYS=30

# Voice Cloning (Optional)
TTS_MODEL=tts_models/multilingual/multi-dataset/your_tts
```

---

## 🎯 Usage Guide

### Creating an AI Profile

1. Click **"Create New"** on the homepage
2. Fill in:
   - **Profile Name** (e.g., "HINATA")
   - **Creator Username** (e.g., "ed_hinata_001")
   - **Description** (what makes this AI unique)
   - **Personality Prompt** (detailed behavior instructions)
   - **Pratfall Probability** slider (how often it "forgets")
3. Click **"Create Profile"**

### Uploading Voice Sample

Use the API to upload audio:

```bash
curl -X POST http://localhost:8000/api/profiles/1/upload-voice \
  -F "file=@voice_sample.wav"
```

The AI will now speak in that voice tone!

### Chatting with AI

1. Select a profile from the list
2. Click **"Start Chatting"**
3. Type messages and watch for:
   - **Typing indicators** (animated dots)
   - **Streaming text** (word-by-word)
   - **Pratfall moments** (💭 "Oops, memory lapse...")
   - **Voice playback** button (if voice uploaded)

### Managing Memories

1. Go to AI profile page
2. Scroll to **"Memory"** section
3. View what the AI remembers about you
4. Click **"Delete"** to remove specific memories

---

## 🛠️ API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/profiles` | List all AI profiles |
| `POST` | `/api/profiles` | Create new profile |
| `POST` | `/api/profiles/{id}/upload-voice` | Upload voice sample |
| `POST` | `/api/chat/send` | Send message to AI |
| `GET` | `/api/chat/history/{profile_id}/{user_id}` | Get chat history |
| `GET` | `/api/memories/{profile_id}/{user_id}` | View memories |
| `DELETE` | `/api/memories/{memory_id}` | Delete specific memory |

---

## 🎨 How It Works

### The Pratfall Effect

1. **Memory Storage**: AI extracts facts from conversations (e.g., "pet_name: Luna")
2. **Random Forgetting**: When `random() < pratfall_probability`, the AI "forgets" a detail
3. **Emotional Response**: AI reacts warmly when corrected, creating empathy
4. **Relationship Building**: User feels like a teacher/caregiver, not just a user

### Voice Cloning Pipeline

1. User uploads audio file (`.wav`, `.mp3`, etc.)
2. Backend stores at `backend/static/audio/{uuid}.wav`
3. Coqui TTS uses it as reference for voice cloning
4. Generated speech saved to `backend/static/audio/generated/`
5. Frontend plays audio via `<audio>` element

### Memory System

```python
# Auto-extracted from chat
UserMemory(
    memory_key="favorite_movie",
    memory_value="Inception",
    confidence=1.0,  # Decays over time
    last_accessed=datetime.now()
)
```

---

## 🚢 Deployment

### Option 1: Local Production

```cmd
REM Backend
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000

REM Frontend (build)
cd frontend
npm run build
REM Serve the `dist` folder with any static server
```

### Option 2: Cloud (Railway/Render)

1. **Backend** → Deploy `backend/main.py` as Python app
2. **Frontend** → Deploy `frontend` as Node.js static site
3. Set environment variables in dashboard
4. Update CORS origins in `backend/main.py`

---

## 🤝 Contributing

Ideas for future enhancements:
- [ ] Multi-language support
- [ ] Group chats with multiple AI personalities
- [ ] Advanced scene/roleplay editor
- [ ] Memory importance scoring
- [ ] Emotion detection from user messages
- [ ] Custom avatar generation (AI-generated faces)

---

## 📄 License

MIT License - feel free to fork, modify, and build upon this!

---

## 🙏 Acknowledgments

- **Pratfall Effect** research by Elliot Aronson
- **Meta AI Studio** for UI inspiration
- **Coqui TTS** for open-source voice cloning
- **LangChain** for LLM orchestration
- **Groq** for ultra-fast LLM inference

---

## 📧 Support

For issues or questions, please open a GitHub issue or contact the creator.

**Built with ❤️ to make AI feel more human.**

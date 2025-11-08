# 🧠 Amnesia AI - Complete Instagram-Inspired AI Chatbot Platform

## ✅ What Has Been Built

### 🎯 Full-Stack Application
- **Backend**: FastAPI server with REST API
- **Frontend**: React + Vite with Instagram-inspired UI
- **Database**: SQLAlchemy with SQLite (easily upgradable to PostgreSQL)
- **AI Engine**: LangChain + Groq (Mixtral 8x7B - ultra-fast inference)
- **Voice Cloning**: Coqui TTS integration

---

## 📂 Project Structure

```
C:\Users\91885\OneDrive\Desktop\avehi\
├── backend/
│   ├── main.py                    ✅ FastAPI app entry point
│   ├── database.py                ✅ SQLAlchemy database connection
│   ├── requirements.txt           ✅ Python dependencies
│   ├── models/
│   │   ├── __init__.py
│   │   └── models.py              ✅ AIProfile, ChatMessage, UserMemory, Scene
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── profiles.py            ✅ Profile CRUD + voice upload
│   │   ├── chat.py                ✅ Chat messaging with Pratfall Effect
│   │   └── memories.py            ✅ Memory management endpoints
│   ├── services/
│   │   ├── __init__.py
│   │   ├── ai_service.py          ✅ LangChain chat logic
│   │   └── voice_service.py       ✅ TTS voice cloning
│   └── static/audio/              ✅ Audio file storage
│
├── frontend/
│   ├── package.json               ✅ NPM dependencies
│   ├── vite.config.js             ✅ Vite configuration
│   ├── index.html                 ✅ HTML entry point
│   ├── src/
│   │   ├── main.jsx               ✅ React app initialization
│   │   ├── App.jsx                ✅ Main app component
│   │   ├── index.css              ✅ Global styles
│   │   ├── components/
│   │   │   ├── ProfileList.jsx    ✅ Profile list + creation form
│   │   │   ├── AIProfile.jsx      ✅ Instagram-style profile view
│   │   │   └── ChatInterface.jsx  ✅ Chat UI with typing indicators
│   │   └── services/
│   │       └── api.js             ✅ Axios API client
│
├── .venv/                         ✅ Python virtual environment
├── .env                           ✅ Environment variables (configured)
├── .env.example                   ✅ Example configuration
├── .gitignore                     ✅ Git ignore rules
├── README.md                      📝 Original concept (preserved)
├── DOCUMENTATION.md               ✅ Complete setup guide
├── setup.bat                      ✅ One-click setup script
├── start-backend.bat              ✅ Backend launcher
└── start-frontend.bat             ✅ Frontend launcher
```

---

## 🎨 Key Features Implemented

### 1️⃣ Instagram-Inspired AI Profile Interface
- ✅ Profile header with avatar, name, creator info
- ✅ Sections: Scenes, AI Studio, Creator, Accuracy, Memory
- ✅ Gradient backgrounds and modern UI design
- ✅ Profile creation form with personality customization

### 2️⃣ Pratfall Effect (AI "Forgetting")
- ✅ Configurable probability (default 15%)
- ✅ AI randomly "forgets" user details
- ✅ Emotional, warm responses when corrected
- ✅ Memory extraction and storage system

### 3️⃣ Voice Cloning Integration
- ✅ Upload audio samples via API
- ✅ Coqui TTS voice cloning service
- ✅ Generated speech stored and served
- ✅ One-click playback in chat interface

### 4️⃣ Emotional Chat Experience
- ✅ Typing indicators with animated dots
- ✅ Streaming text (word-by-word display)
- ✅ Pratfall moments flagged with 💭
- ✅ Audio playback for voice responses

### 5️⃣ Memory Management
- ✅ Auto-extraction from conversations
- ✅ User-controlled deletion
- ✅ Confidence decay over time
- ✅ Memory viewer in profile

### 6️⃣ Scenes/Roleplay System
- ✅ Database model for scenes
- ✅ API endpoints for CRUD
- ✅ Scene cards in profile UI
- ✅ Scenario prompt injection in chat

---

## 🚀 Quick Start (3 Steps)

### Step 1: Setup (One-Time)
```cmd
REM Run the setup script
setup.bat

REM Edit .env and add your OpenAI API key
notepad .env
```

### Step 2: Start Backend
```cmd
REM In terminal 1
start-backend.bat
```
Backend runs at **http://localhost:8000**

### Step 3: Start Frontend
```cmd
REM In terminal 2 (after backend is running)
cd frontend
npm install
npm run dev
```
Frontend runs at **http://localhost:5173**

---

## 📋 Requirements

### What You Need
- ✅ Python 3.9+ (installed)
- ✅ Node.js 18+ and npm
- ✅ OpenAI API key ([get here](https://platform.openai.com/api-keys))
- ✅ Virtual environment (`.venv` already created)

### Dependencies Installed Via Scripts
**Backend (requirements.txt)**:
- FastAPI, Uvicorn
- SQLAlchemy, Alembic
- OpenAI, LangChain
- Coqui TTS (voice cloning)
- Pydantic, python-dotenv

**Frontend (package.json)**:
- React 18
- Vite
- Axios
- Lucide React icons
- Framer Motion (animations)

---

## 🎯 How to Use

### Create Your First AI Profile
1. Open http://localhost:5173
2. Click **"Create New"**
3. Fill in:
   - Name: `HINATA` (or any name)
   - Creator: `ed_hinata_001` (your username)
   - Description: Brief intro
   - Personality Prompt: Detailed behavior instructions
   - Pratfall Probability: Slider (0-50%)
4. Click **"Create Profile"**

### Upload Voice Sample (Optional)
```bash
curl -X POST http://localhost:8000/api/profiles/1/upload-voice \
  -F "file=@voice_sample.wav"
```

### Start Chatting
1. Click on a profile
2. Click **"Start Chatting"**
3. Type messages and watch for:
   - Animated typing dots
   - Streaming text
   - 💭 Pratfall moments
   - Voice playback button

---

## 🛠️ API Endpoints

Visit **http://localhost:8000/docs** for interactive API docs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/profiles` | GET | List all AI profiles |
| `/api/profiles` | POST | Create new profile |
| `/api/profiles/{id}` | GET | Get profile details |
| `/api/profiles/{id}/upload-voice` | POST | Upload voice sample |
| `/api/profiles/{id}/scenes` | GET/POST | Manage scenes |
| `/api/chat/send` | POST | Send message to AI |
| `/api/chat/history/{profile_id}/{user_id}` | GET | Get chat history |
| `/api/memories/{profile_id}/{user_id}` | GET | View memories |
| `/api/memories/{memory_id}` | DELETE | Delete memory |

---

## 🔧 Configuration

### Environment Variables (.env)
```env
# REQUIRED: Your OpenAI API key
OPENAI_API_KEY=sk-your-actual-key-here

# Database (SQLite by default)
DATABASE_URL=sqlite:///./amnesia.db

# Server
HOST=0.0.0.0
PORT=8000
DEBUG=True

# AI Behavior
PRATFALL_PROBABILITY=0.15        # 15% chance to forget
MEMORY_DECAY_DAYS=30

# Voice Cloning
TTS_MODEL=tts_models/multilingual/multi-dataset/your_tts
```

---

## 🎨 UI Components

### Profile Page Sections
1. **Header**: Avatar, name, creator (@username), description
2. **Scenes**: Roleplay scenarios with gradient cards
3. **AI Studio**: Personality config and pratfall settings
4. **Creator**: Attribution section
5. **Accuracy**: Disclaimer about AI limitations
6. **Memory**: What the AI remembers about you

### Chat Interface
1. **Header**: AI name and status (Online/Typing)
2. **Messages**: User (right, purple) and AI (left, gray)
3. **Typing Indicator**: Animated dots
4. **Pratfall Flag**: 💭 "Oops, memory lapse..."
5. **Voice Player**: Button to play AI voice responses
6. **Input**: Message box with Send button

---

## 📦 Deployment Options

### Option 1: Local Production
```cmd
REM Backend
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000

REM Frontend (build)
cd frontend
npm run build
REM Serve dist/ folder with any static server
```

### Option 2: Cloud (Railway/Render/Vercel)
1. Deploy `backend/` as Python app
2. Deploy `frontend/` as Node.js static site
3. Set environment variables in dashboard
4. Update CORS in `backend/main.py`

---

## 🧪 Testing

### Test Backend API
```cmd
REM Check health
curl http://localhost:8000/health

REM Create profile
curl -X POST http://localhost:8000/api/profiles \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test AI\",\"creator_username\":\"test\",\"personality_prompt\":\"You are friendly\"}"
```

### Test Frontend
1. Open http://localhost:5173
2. Create a profile
3. Start chatting
4. Check browser console for errors

---

## 🎓 Learning Resources

### Pratfall Effect
- Psychology: People like those who make small mistakes
- Implementation: Random "forgetting" with warm reactions
- Reference: Elliot Aronson's research

### Voice Cloning (Coqui TTS)
- Docs: https://github.com/coqui-ai/TTS
- Upload reference audio → AI speaks in that voice
- Supports multiple languages

### LangChain
- Docs: https://python.langchain.com/
- Orchestrates LLM calls with memory and context
- Used for personality injection and memory extraction

---

## 🐛 Troubleshooting

### Backend won't start
- ✅ Activate venv: `.venv\Scripts\activate`
- ✅ Install deps: `pip install -r backend/requirements.txt`
- ✅ Check `.env` has OPENAI_API_KEY

### Frontend won't start
- ✅ Run `npm install` in `frontend/`
- ✅ Check Node.js version: `node --version` (need 18+)

### AI not responding
- ✅ Check OpenAI API key is valid
- ✅ Check backend logs for errors
- ✅ Verify database created: `amnesia.db`

### Voice not working
- ✅ TTS installation can be slow/fail on Windows
- ✅ Voice cloning is optional - chat works without it
- ✅ Check `backend/static/audio/` folder exists

---

## 🎉 What's Next?

### Suggested Enhancements
- [ ] User authentication (login/signup)
- [ ] Group chats with multiple AIs
- [ ] Mobile app (React Native)
- [ ] Advanced scene editor with branching
- [ ] Emotion detection from user messages
- [ ] AI-generated avatars
- [ ] Multi-language support
- [ ] Memory importance scoring
- [ ] Export chat history

---

## 📧 Support

For issues or questions:
1. Check `DOCUMENTATION.md` for setup guide
2. Review API docs at http://localhost:8000/docs
3. Check browser/terminal console for errors
4. Verify all dependencies installed

---

**Built with ❤️ for emotionally intelligent AI interactions.**

*Making AI feel more human, one forgotten detail at a time.* 🧠✨

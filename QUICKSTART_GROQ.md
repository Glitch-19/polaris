# 🚀 Quick Start with Groq

## 3-Step Setup

### 1️⃣ Get Groq API Key (Free!)
1. Visit: **https://console.groq.com**
2. Sign up (takes 30 seconds)
3. Go to: **https://console.groq.com/keys**
4. Click **"Create API Key"**
5. Copy the key (starts with `gsk-`)

### 2️⃣ Configure Environment
```cmd
REM Open .env file
notepad .env

REM Replace this line:
GROQ_API_KEY=change-me

REM With your actual key:
GROQ_API_KEY=gsk-your-actual-key-here
```

Save and close the file.

### 3️⃣ Install & Run
```cmd
REM Activate virtual environment
.venv\Scripts\activate

REM Install dependencies (includes Groq)
pip install -r backend\requirements.txt

REM Test Groq connection
python test_groq.py

REM If test passes, start backend
python backend\main.py
```

---

## Verify It's Working

When you run `test_groq.py`, you should see:

```
==================================================
🧠 Amnesia AI - Groq Integration Test
==================================================

🔑 API Key found, testing connection...
✅ Success! Groq responded: Hello from Groq!
⚡ Response time: Ultra-fast!

🔗 Testing LangChain + Groq integration...
✅ LangChain + Groq working! Response: Four

==================================================
✅ All tests passed! You're ready to run the app.
   Next: python backend/main.py
==================================================
```

---

## Common Issues

### "❌ GROQ_API_KEY not set"
- Check `.env` file exists in project root
- Make sure you replaced `change-me` with actual key
- Key should start with `gsk-`

### "❌ groq package not installed"
```cmd
pip install groq langchain-groq
```

### "❌ Invalid API key"
- Copy key again from https://console.groq.com/keys
- Check for extra spaces in `.env`
- Make sure venv is activated

---

## Why Groq is Better for This Project

✅ **10-25x faster** than OpenAI  
✅ **Free tier** with generous limits  
✅ **32K context** for better memory  
✅ **No rate limiting** on free tier  
✅ **Instant responses** = better UX  

---

## Next Steps

1. ✅ Get Groq API key
2. ✅ Add to `.env`
3. ✅ Run `python test_groq.py`
4. ✅ Start backend: `python backend/main.py`
5. ✅ Start frontend: `cd frontend && npm run dev`
6. 🎉 Chat with your AI at **http://localhost:5173**

---

**Questions?** Check `GROQ_SETUP.md` or `WHY_GROQ.md` for more details!

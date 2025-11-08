# 🚀 Groq API Setup Guide

## Why Groq?

**Groq provides ultra-fast LLM inference** — significantly faster than OpenAI while maintaining high quality:
- ⚡ **10-100x faster** response times
- 💰 **More affordable** pricing
- 🧠 **Mixtral 8x7B** model (comparable to GPT-4)
- 🔓 **No rate limits** on free tier

---

## Getting Your Groq API Key

### Step 1: Create Account
1. Go to **https://console.groq.com**
2. Sign up with Google/GitHub or email
3. Verify your email

### Step 2: Generate API Key
1. Navigate to **https://console.groq.com/keys**
2. Click **"Create API Key"**
3. Copy the key (starts with `gsk-...`)

### Step 3: Add to .env
Open `.env` in the project root and replace:

```env
GROQ_API_KEY=gsk-your-actual-key-here
```

---

## Available Models

The project uses **Mixtral 8x7B** by default, but you can change it in `backend/services/ai_service.py`:

```python
self.llm = ChatGroq(
    model="mixtral-8x7b-32768",  # Current model
    # OR try these:
    # model="llama2-70b-4096",
    # model="gemma-7b-it",
    temperature=0.9,
    groq_api_key=os.getenv("GROQ_API_KEY")
)
```

### Model Comparison

| Model | Speed | Quality | Context Length |
|-------|-------|---------|----------------|
| **mixtral-8x7b-32768** | ⚡⚡⚡ | 🌟🌟🌟🌟 | 32,768 tokens |
| llama2-70b-4096 | ⚡⚡ | 🌟🌟🌟 | 4,096 tokens |
| gemma-7b-it | ⚡⚡⚡ | 🌟🌟🌟 | 8,192 tokens |

---

## Testing Your Setup

After adding the API key, test it:

```cmd
.venv\Scripts\activate
python -c "from groq import Groq; client = Groq(); print('✅ Groq API key is valid!')"
```

If you see `✅ Groq API key is valid!`, you're ready to go!

---

## Advantages for This Project

1. **Faster Pratfall Effect** — AI responds instantly, making "forgetting" moments feel more natural
2. **Lower Costs** — More chats for the same budget
3. **Better UX** — No waiting for slow API responses
4. **Free Tier** — Generous limits for development

---

## Troubleshooting

**Error: "Invalid API key"**
- Check key starts with `gsk-`
- No extra spaces in `.env`
- Key copied correctly from console.groq.com

**Error: "Rate limit exceeded"**
- Free tier has limits; wait a minute or upgrade
- Check https://console.groq.com/settings/limits

**Error: "Import langchain_groq could not be resolved"**
- Run: `pip install langchain-groq`
- Make sure venv is activated

---

## Links

- **Groq Console**: https://console.groq.com
- **API Keys**: https://console.groq.com/keys
- **Documentation**: https://console.groq.com/docs
- **Pricing**: https://wow.groq.com/pricing

---

✨ **You're now using one of the fastest LLM APIs in the world!**

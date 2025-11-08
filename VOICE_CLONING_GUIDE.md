# 🎤 Voice Cloning Guide - Amnesia AI

## Overview
The voice cloning feature allows you to upload audio samples of a character, and the AI will generate responses in that voice, creating a more immersive and emotional experience.

## How to Use

### 1. Upload Voice Sample
1. Open an AI Profile
2. Scroll to the **"Voice Cloning"** section
3. Click **"Upload Voice Sample"**
4. Select an audio file from your device

### 2. Recommended Audio Specifications
- **Duration**: 5-30 seconds of clear audio
- **Formats**: .wav, .mp3, .m4a, .ogg, .flac
- **Quality**: Clear speech, minimal background noise
- **Content**: Single speaker, natural tone

### 3. Best Practices for Voice Samples
✅ **Good Examples:**
- Clean podcast clips
- Audiobook excerpts
- Interview recordings
- Voice messages
- Movie/TV dialogue (clear audio)

❌ **Avoid:**
- Multiple speakers talking
- Heavy background music
- Noisy environments
- Very short clips (<3 seconds)
- Heavily processed/auto-tuned audio

### 4. Using Voice Cloned Responses
Once uploaded:
1. Start chatting with the AI profile
2. AI responses will include a **🔊 Play Audio** button
3. Click to hear the AI speak in the cloned voice
4. Audio is generated in real-time for each response

## Technical Details

### Voice Cloning Model
- Uses **Coqui TTS** (Text-to-Speech)
- Model: YourTTS (multilingual, multi-speaker)
- Supports voice cloning from reference audio
- Generates natural-sounding speech

### Audio Storage
- Voice samples: `backend/static/audio/uploads/`
- Generated audio: `backend/static/audio/generated/`
- Files served via FastAPI static file serving

### API Endpoints
```
POST /api/profiles/{profile_id}/upload-voice/
- Upload voice sample for a profile
- Accepts: multipart/form-data with audio file
- Returns: File path confirmation

POST /api/chat/send/
- Send message and get AI response
- Returns: Text response + audio_url (if voice uploaded)
```

## Troubleshooting

### "Voice sample upload failed"
- Check file format (must be audio/*)
- Ensure file size is reasonable (<50MB)
- Verify backend is running (port 8001)

### "No audio button appears"
- Ensure voice sample was uploaded successfully
- Check that `voice_file_path` is set in profile
- Verify backend TTS service is running

### "Audio doesn't play"
- Check browser console for errors
- Ensure audio file was generated successfully
- Try refreshing the page
- Check backend logs for TTS errors

## Example Workflow

```javascript
// 1. Create AI Profile
const profile = {
  name: "Morgan Freeman",
  personality_prompt: "Wise, calm, narrates everything",
  pratfall_probability: 0.1
}

// 2. Upload Voice Sample
Upload: morgan_freeman_voice.mp3 (10 seconds)

// 3. Chat with AI
User: "Tell me about the universe"
AI: "The cosmos is vast and mysterious..." 
    [🔊 Play Audio] <- Hear this in Morgan Freeman's voice!
```

## Performance Notes
- First voice generation may take 5-10 seconds
- Subsequent generations are faster
- Audio files are cached for playback
- Quality depends on reference audio quality

## Privacy & Storage
- Voice samples are stored locally on your server
- Generated audio is temporary (can be cleaned periodically)
- No data is sent to external services
- All processing happens on your machine

---

Enjoy creating emotionally rich AI conversations with voice cloning! 🎙️✨

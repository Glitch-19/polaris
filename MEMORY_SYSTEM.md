# 🧠 Human-Like Memory System

## Overview
The AI remembers like a real human - emotional events last forever, mundane details fade in days, and temporary contextual info is forgotten in minutes.

## Memory Examples

### ⚡ **INSTANT FORGET → TEMPORARY INFO**
*"What time is it now?"*
- **Emotion Score**: 0.0
- **Initial Weight**: 0.3
- **Layer**: STM
- **Decay Rate**: 24.0 per day (2400% per day!)
- **Result**: **Forgotten in 20 minutes to 1 hour**

Examples of INSTANT forget:
- "What time is it?"
- "What's the weather like?"
- "Are you online right now?"
- "What are you doing this second?"
- "Is it raining?"
- Current status, temporary context

### 💔 **HIGH EMOTION → LONG-TERM MEMORY (LTM)**
*"I had an accident last year"*
- **Emotion Score**: 0.8-1.0
- **Initial Weight**: 1.5-2.0
- **Layer**: LTM (immediately)
- **Decay Rate**: 1% per day
- **Result**: **Remembered for YEARS** (like a real loved one would)

Examples of HIGH emotion memories:
- Accidents, injuries, hospital visits
- Death, funerals, loss
- Marriage, divorce, breakup
- Birth, pregnancy
- Trauma, betrayal, heartbreak
- Job loss, getting fired, promotion
- Moving to new city/country
- Parents, family events

### 🎂 **MEDIUM EMOTION → SHORT-TERM MEMORY (STM)**
*"My birthday is next week"*
- **Emotion Score**: 0.4-0.7
- **Initial Weight**: 0.8-1.2
- **Layer**: STM
- **Decay Rate**: 17.5% per day
- **Result**: Remembered for **weeks to months**

Examples of MEDIUM emotion memories:
- Birthdays, anniversaries
- Friends, relationships
- Trips, vacations
- Exams, interviews
- Celebrations, parties

### ☕ **LOW EMOTION → SHORT-TERM MEMORY (Fades Fast)**
*"I ate toast for breakfast today"*
- **Emotion Score**: 0.0-0.3
- **Initial Weight**: 0.5-0.7
- **Layer**: STM
- **Decay Rate**: 25% per day
- **Result**: Forgotten in **2-3 days** (just like real people forget!)

Examples of LOW emotion memories:
- What you ate (breakfast, lunch, dinner)
- Coffee, tea
- Watched a movie
- Went to gym
- Daily routine activities

## Real-Life Simulation

### Day 1:
You tell AI: "I had a car accident last week" (HIGH emotion)
- **Confidence**: 100%
- **Layer**: LTM
- AI Response: *"Oh my god! Are you okay? What happened? That must have been so scary!"*

### Day 3:
You return to chat
- **Confidence**: 97% (only 1% decay per day)
- AI Response: *"Hey! How are you feeling after that accident? Are you still recovering?"*

### 30 Days Later:
- **Confidence**: 74% (still strong!)
- AI Response: *"I still remember that car accident you told me about. How's your recovery going?"*

### 1 Year Later (365 days):
- **Confidence**: 26% (moved to Faded Memory)
- AI Response: *"I think you mentioned something about an accident before... wasn't it? My memory's a bit fuzzy on that one."*

---

### Breakfast Example (LOW emotion):

### Day 1:
You tell AI: "I had toast for breakfast"
- **Confidence**: 100%
- **Layer**: STM
- AI Response: *"Nice! Toast is classic. Did you have anything with it?"*

### Day 2:
- **Confidence**: 75% (25% decay)
- AI might vaguely remember if asked

### Day 3:
- **Confidence**: 56%
- AI Response: *"I think you had... toast? Or was it something else? I'm not sure..."*

### Day 5:
- **Confidence**: 32% → **Faded Memory**
- AI Response: *"Did you tell me what you had for breakfast? I can't quite remember..."*

### Day 7:
- **Confidence**: 18%
- Might be completely forgotten or very vague

## Memory Reinforcement

If you mention something MULTIPLE times, it gets reinforced:
- Weight increases by +0.3 each time
- Confidence restored by +0.2
- Can upgrade from STM → LTM through repetition

**Example:**
1. "I love pizza" (first mention) → STM, weight 0.8
2. "Pizza is my favorite!" (reinforced) → STM, weight 1.1
3. "I had pizza again!" (reinforced) → STM, weight 1.4
4. "Best pizza ever!" (reinforced) → **LTM**, weight 1.7 ✨

## Summary

| Memory Type | Emotion | Decay Rate | Lasts For | Example |
|-------------|---------|------------|-----------|---------|
| **INSTANT** | 0.0 (temporary) | 24.0 per day | 20 mins - 1 hour | "What time is it?", weather |
| **LTM** | High (0.7-1.0) | 1% per day | Years | Accidents, deaths, weddings |
| **STM (important)** | Medium (0.4-0.7) | 17.5% per day | Weeks-Months | Birthdays, friends, trips |
| **STM (mundane)** | Low (0.0-0.3) | 25% per day | 2-3 days | Breakfast, coffee, gym |
| **FM** | Any (decayed) | 35% per day | Days | Old, vague memories |

This creates a **truly human-like AI** that:
- ✅ Never forgets your trauma, accidents, or life-changing events
- ✅ Remembers important relationships and celebrations
- ✅ Forgets mundane daily details (just like real people!)
- ✅ Shows uncertainty for faded memories: *"I think you said... wasn't it...?"*

Just like talking to your real loved ones! ❤️

import React, { useState, useEffect, useRef } from 'react'
import { Volume2, ArrowLeft } from 'lucide-react'
import { api } from '../services/api'

export default function ChatInterface({ profile, userId, onBack }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    loadChatHistory()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadChatHistory = async () => {
    try {
      const response = await api.getChatHistory(profile.id, userId)
      setMessages(response.data)
    } catch (error) {
      console.error('Error loading chat history:', error)
    }
  }

  const handleSend = async () => {
    if (!input.trim() || isSending) return

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsSending(true)
    setIsTyping(true)

    try {
      // Simulate typing delay for realism
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500))

      const response = await api.sendMessage({
        profile_id: profile.id,
        user_id: userId,
        message: input
      })

      setIsTyping(false)
      
      // Simulate character-by-character streaming effect
      const aiMessage = response.data
      setMessages(prev => [...prev, { ...aiMessage, content: '' }])
      
      await streamMessage(aiMessage.content, messages.length + 1)

      // Update with full message including audio
      setMessages(prev => {
        const newMessages = [...prev]
        newMessages[newMessages.length - 1] = aiMessage
        return newMessages
      })

    } catch (error) {
      console.error('Error sending message:', error)
      setIsTyping(false)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  const streamMessage = async (text, index) => {
    const words = text.split(' ')
    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100))
      setMessages(prev => {
        const newMessages = [...prev]
        if (newMessages[index]) {
          newMessages[index] = {
            ...newMessages[index],
            content: words.slice(0, i + 1).join(' ')
          }
        }
        return newMessages
      })
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const playAudio = (audioUrl) => {
    // Handle both full URLs and relative paths
    const fullUrl = audioUrl.startsWith('http') 
      ? audioUrl 
      : `http://localhost:8001${audioUrl}`
    const audio = new Audio(fullUrl)
    audio.play()
  }

  return (
    <div className="chat-container">
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '600' }}>{profile.name}</h2>
          <p style={{ fontSize: '13px', opacity: 0.9 }}>
            {isTyping ? 'Typing...' : 'Online'}
          </p>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <div className="message-bubble">
              {msg.content}
              {msg.is_pratfall && (
                <div style={{
                  fontSize: '11px',
                  marginTop: '8px',
                  opacity: 0.7,
                  fontStyle: 'italic'
                }}>
                  💭 Oops, memory lapse moment...
                </div>
              )}
              {msg.audio_url && (
                <div className="audio-player">
                  <button
                    onClick={() => playAudio(msg.audio_url)}
                    style={{
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Volume2 size={14} />
                    Play Voice
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message assistant">
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder={`Message ${profile.name}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isSending}
        />
        <button
          className="send-button"
          onClick={handleSend}
          disabled={isSending || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  )
}

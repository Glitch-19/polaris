import React, { useState, useEffect } from 'react'
import { Brain, MessageCircle, Archive, User, AlertTriangle, Database, Settings, Mic } from 'lucide-react'
import { api } from '../services/api'

export default function AIProfile({ profile, onStartChat, onBack }) {
  const [scenes, setScenes] = useState([])
  const [memories, setMemories] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [uploadingVoice, setUploadingVoice] = useState(false)
  const [recloning, setRecloning] = useState(false)
  const [sampleCount, setSampleCount] = useState(0)
  const userId = 'user_' + Math.random().toString(36).substr(2, 9)

  useEffect(() => {
    loadScenes()
    loadMemories()
    updateSampleCount()
  }, [profile.id])

  const updateSampleCount = () => {
    if (profile.voice_file_path) {
      try {
        const samples = JSON.parse(profile.voice_file_path)
        setSampleCount(Array.isArray(samples) ? samples.length : 1)
      } catch {
        setSampleCount(1)
      }
    } else {
      setSampleCount(0)
    }
  }

  const loadScenes = async () => {
    try {
      const response = await api.getScenes(profile.id)
      setScenes(response.data)
    } catch (error) {
      console.error('Error loading scenes:', error)
    }
  }

  const loadMemories = async () => {
    try {
      const response = await api.getMemories(profile.id, userId)
      setMemories(response.data)
    } catch (error) {
      console.error('Error loading memories:', error)
    }
  }

  const handleDeleteMemory = async (memoryId) => {
    try {
      await api.deleteMemory(memoryId)
      loadMemories()
    } catch (error) {
      console.error('Error deleting memory:', error)
    }
  }

  const handleVoiceUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('audio/')) {
      alert('Please upload an audio file')
      return
    }

    setUploadingVoice(true)
    try {
      const response = await api.uploadVoice(profile.id, file)
      const newCount = response.data.total_samples || 1
      alert(`Voice sample ${newCount} uploaded! ${response.data.tip || ''}`)
      window.location.reload()
    } catch (error) {
      console.error('Error uploading voice:', error)
      alert('Failed to upload voice sample')
    } finally {
      setUploadingVoice(false)
    }
  }

  const handleRecloneVoice = async () => {
    if (!confirm(`Re-clone voice with ${sampleCount} sample(s)? This will create a new high-quality voice clone.`)) {
      return
    }

    setRecloning(true)
    try {
      const response = await api.recloneVoice(profile.id)
      alert(response.data.message + '\n\nVoice quality improved with ' + (response.data.samples_used || sampleCount) + ' samples!')
      window.location.reload()
    } catch (error) {
      console.error('Error re-cloning voice:', error)
      alert('Failed to re-clone voice')
    } finally {
      setRecloning(false)
    }
  }

  const handleClearVoiceSamples = async () => {
    if (!confirm('Delete all voice samples and start fresh?')) {
      return
    }

    try {
      await api.clearVoiceSamples(profile.id)
      alert('All voice samples cleared. Upload new samples for better cloning!')
      window.location.reload()
    } catch (error) {
      console.error('Error clearing samples:', error)
      alert('Failed to clear samples')
    }
  }

  return (
    <div>
      <div className="profile-header">
        <div 
          className="profile-avatar"
          style={{
            backgroundImage: profile.avatar_url ? `url(${profile.avatar_url})` : 'none',
            backgroundColor: '#764ba2'
          }}
        >
          {!profile.avatar_url && <Brain size={48} color="white" style={{ marginTop: '36px' }} />}
        </div>
        <h1 className="profile-name">{profile.name}</h1>
        <p className="profile-creator">AI by @{profile.creator_username}</p>
        <p className="profile-description">{profile.description}</p>
        <button 
          onClick={onStartChat}
          style={{
            marginTop: '20px',
            padding: '12px 32px',
            background: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: '24px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          💬 Start Chatting
        </button>
        <button 
          onClick={onBack}
          style={{
            marginTop: '10px',
            marginLeft: '10px',
            padding: '12px 32px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid white',
            borderRadius: '24px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          ← Back
        </button>
      </div>

      <div className="profile-sections">
        {/* Scenes Section */}
        <div className="section">
          <h2 className="section-title">
            <Archive size={20} style={{ display: 'inline', marginRight: '8px' }} />
            Scenes
          </h2>
          {scenes.length > 0 ? (
            scenes.map(scene => (
              <div key={scene.id} className="scene-card">
                <div className="scene-title">{scene.title}</div>
                <div className="scene-description">{scene.description}</div>
              </div>
            ))
          ) : (
            <p style={{ color: '#999', fontSize: '14px' }}>No scenes available yet</p>
          )}
        </div>

        {/* AI Studio Section */}
        <div className="section">
          <h2 className="section-title">
            <Settings size={20} style={{ display: 'inline', marginRight: '8px' }} />
            AI Studio
          </h2>
          <div className="section-item">
            <strong>Personality:</strong> {profile.personality_prompt.substring(0, 100)}...
          </div>
          <div className="section-item">
            <strong>Pratfall Probability:</strong> {(profile.pratfall_probability * 100).toFixed(0)}%
          </div>
        </div>

        {/* Voice Cloning Section */}
        <div className="section">
          <h2 className="section-title">
            <Mic size={20} style={{ display: 'inline', marginRight: '8px' }} />
            Voice Cloning {sampleCount > 0 && `(${sampleCount} sample${sampleCount > 1 ? 's' : ''})`}
          </h2>
          <div className="section-item">
            {profile.voice_file_path ? (
              <div>
                <p style={{ color: '#4ade80', marginBottom: '12px', fontWeight: '600' }}>
                  ✓ {sampleCount} voice sample{sampleCount > 1 ? 's' : ''} uploaded
                </p>
                <p style={{ color: '#999', marginBottom: '15px', fontSize: '13px' }}>
                  {sampleCount >= 3 
                    ? '✨ Great! 3+ samples provide excellent accent cloning'
                    : sampleCount >= 2
                    ? '👍 Good! Add 1-2 more samples for better Indian accent matching'
                    : '💡 Upload 2-4 more samples (different sentences) for MUCH better accent cloning'
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <label 
                    htmlFor="voice-upload"
                    style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      borderRadius: '8px',
                      cursor: uploadingVoice ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      opacity: uploadingVoice ? 0.6 : 1
                    }}
                  >
                    {uploadingVoice ? 'Uploading...' : `🎤 Add Sample ${sampleCount + 1}`}
                  </label>

                  {sampleCount >= 1 && (
                    <button
                      onClick={handleRecloneVoice}
                      disabled={recloning}
                      style={{
                        padding: '8px 16px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: recloning ? 'not-allowed' : 'pointer',
                        fontSize: '14px',
                        opacity: recloning ? 0.6 : 1
                      }}
                    >
                      {recloning ? 'Re-cloning...' : '🔄 Re-Clone Voice Now'}
                    </button>
                  )}

                  <button
                    onClick={handleClearVoiceSamples}
                    style={{
                      padding: '8px 16px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: '#ef4444',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    🗑️ Clear All
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p style={{ color: '#999', marginBottom: '10px', fontSize: '14px' }}>
                  Upload 3-5 voice samples (each 10-30 seconds) for BEST Indian accent cloning!
                </p>
                <label 
                  htmlFor="voice-upload"
                  style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    borderRadius: '8px',
                    cursor: uploadingVoice ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    opacity: uploadingVoice ? 0.6 : 1
                  }}
                >
                  {uploadingVoice ? 'Uploading...' : '🎤 Upload First Sample'}
                </label>
                <p style={{ color: '#666', marginTop: '8px', fontSize: '12px' }}>
                  Upload different sentences, one at a time (.wav, .mp3, .m4a)
                </p>
              </div>
            )}
            <input
              id="voice-upload"
              type="file"
              accept="audio/*"
              onChange={handleVoiceUpload}
              disabled={uploadingVoice}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Creator Section */}
        <div className="section">
          <h2 className="section-title">
            <User size={20} style={{ display: 'inline', marginRight: '8px' }} />
            Creator
          </h2>
          <div className="section-item">
            Created by @{profile.creator_username}
          </div>
        </div>

        {/* Accuracy Disclaimer */}
        <div className="section">
          <h2 className="section-title">
            <AlertTriangle size={20} style={{ display: 'inline', marginRight: '8px' }} />
            Accuracy
          </h2>
          <div className="disclaimer">
            AI messages may be inaccurate or inappropriate. This AI is designed to occasionally "forget" 
            details as part of the Pratfall Effect, making interactions more human and relatable. 
            Information provided should not be considered factually accurate.
          </div>
        </div>

        {/* Memory Section */}
        <div className="section">
          <h2 className="section-title">
            <Database size={20} style={{ display: 'inline', marginRight: '8px' }} />
            Memory ({memories.length})
          </h2>
          {memories.length > 0 ? (
            memories.map(memory => (
              <div key={memory.id} className="memory-item">
                <div>
                  <div className="memory-key">{memory.memory_key}</div>
                  <div className="memory-value">{memory.memory_value}</div>
                </div>
                <button 
                  className="delete-button"
                  onClick={() => handleDeleteMemory(memory.id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: '#999', fontSize: '14px' }}>
              No memories yet. Start chatting to build a relationship!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

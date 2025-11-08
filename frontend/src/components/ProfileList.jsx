import React, { useState, useEffect } from 'react'
import { Brain, Plus } from 'lucide-react'
import { api } from '../services/api'

export default function ProfileList({ onSelectProfile }) {
  const [profiles, setProfiles] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    creator_username: '',
    description: '',
    personality_prompt: '',
    pratfall_probability: 0.15
  })

  useEffect(() => {
    loadProfiles()
  }, [])

  const loadProfiles = async () => {
    try {
      const response = await api.getProfiles()
      setProfiles(response.data)
    } catch (error) {
      console.error('Error loading profiles:', error)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await api.createProfile(formData)
      setShowCreateForm(false)
      setFormData({
        name: '',
        creator_username: '',
        description: '',
        personality_prompt: '',
        pratfall_probability: 0.15
      })
      loadProfiles()
    } catch (error) {
      console.error('Error creating profile:', error)
      alert('Failed to create profile')
    }
  }

  if (showCreateForm) {
    return (
      <div style={{ padding: '30px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Create New AI Profile</h2>
        <form onSubmit={handleCreate}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
              Profile Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '15px'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
              Creator Username
            </label>
            <input
              type="text"
              value={formData.creator_username}
              onChange={(e) => setFormData({ ...formData, creator_username: e.target.value })}
              placeholder="e.g., ed_hinata_001"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '15px'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '15px',
                minHeight: '80px'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
              Personality Prompt
            </label>
            <textarea
              value={formData.personality_prompt}
              onChange={(e) => setFormData({ ...formData, personality_prompt: e.target.value })}
              placeholder="Describe the AI's personality, tone, and behavior..."
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '15px',
                minHeight: '120px'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
              Pratfall Probability ({(formData.pratfall_probability * 100).toFixed(0)}%)
            </label>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.05"
              value={formData.pratfall_probability}
              onChange={(e) => setFormData({ ...formData, pratfall_probability: parseFloat(e.target.value) })}
              style={{ width: '100%' }}
            />
            <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              How often the AI "forgets" to seem more human
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Create Profile
            </button>
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              style={{
                padding: '12px 24px',
                background: '#f0f0f0',
                color: '#333',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px' 
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700' }}>
          🧠 Amnesia AI Profiles
        </h1>
        <button
          onClick={() => setShowCreateForm(true)}
          style={{
            padding: '10px 20px',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Plus size={18} />
          Create New
        </button>
      </div>

      {profiles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
          <Brain size={64} style={{ margin: '0 auto 20px', opacity: 0.3 }} />
          <p style={{ fontSize: '18px' }}>No AI profiles yet</p>
          <p style={{ fontSize: '14px', marginTop: '10px' }}>
            Create your first emotionally intelligent AI companion!
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {profiles.map(profile => (
            <div
              key={profile.id}
              onClick={() => onSelectProfile(profile)}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '25px',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>{profile.name}</h3>
              <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '12px' }}>
                AI by @{profile.creator_username}
              </p>
              <p style={{ fontSize: '15px', opacity: 0.95 }}>
                {profile.description || 'No description'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

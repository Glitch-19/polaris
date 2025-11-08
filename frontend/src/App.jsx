import React, { useState, useEffect } from 'react'
import AIProfile from './components/AIProfile'
import ChatInterface from './components/ChatInterface'
import ProfileList from './components/ProfileList'

function App() {
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [view, setView] = useState('list') // 'list', 'profile', 'chat'
  
  // Generate or retrieve persistent userId from localStorage
  const getUserId = () => {
    let userId = localStorage.getItem('amnesia_user_id')
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('amnesia_user_id', userId)
    }
    return userId
  }
  
  const userId = getUserId()

  return (
    <div className="container">
      {view === 'list' && (
        <ProfileList 
          onSelectProfile={(profile) => {
            setSelectedProfile(profile)
            setView('profile')
          }}
        />
      )}
      
      {view === 'profile' && selectedProfile && (
        <AIProfile 
          profile={selectedProfile}
          onStartChat={() => setView('chat')}
          onBack={() => setView('list')}
        />
      )}
      
      {view === 'chat' && selectedProfile && (
        <ChatInterface 
          profile={selectedProfile}
          userId={userId}
          onBack={() => setView('profile')}
        />
      )}
    </div>
  )
}

export default App

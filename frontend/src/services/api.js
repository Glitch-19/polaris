import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001/api'

export const api = {
  // Profiles
  getProfiles: () => axios.get(`${API_BASE_URL}/profiles`),
  getProfile: (id) => axios.get(`${API_BASE_URL}/profiles/${id}`),
  createProfile: (data) => axios.post(`${API_BASE_URL}/profiles`, data),
  updateProfile: (id, data) => axios.put(`${API_BASE_URL}/profiles/${id}`, data),
  deleteProfile: (id) => axios.delete(`${API_BASE_URL}/profiles/${id}`),
  uploadVoice: (profileId, file) => {
    const formData = new FormData()
    formData.append('file', file)
    return axios.post(`${API_BASE_URL}/profiles/${profileId}/upload-voice`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  recloneVoice: (profileId) => axios.post(`${API_BASE_URL}/profiles/${profileId}/reclone-voice`),
  clearVoiceSamples: (profileId) => axios.delete(`${API_BASE_URL}/profiles/${profileId}/clear-voice-samples`),
  
  // Scenes
  getScenes: (profileId) => axios.get(`${API_BASE_URL}/profiles/${profileId}/scenes`),
  createScene: (profileId, data) => axios.post(`${API_BASE_URL}/profiles/${profileId}/scenes`, data),
  
  // Chat
  sendMessage: (data) => axios.post(`${API_BASE_URL}/chat/send`, data),
  getChatHistory: (profileId, userId) => axios.get(`${API_BASE_URL}/chat/history/${profileId}/${userId}`),
  clearChatHistory: (profileId, userId) => axios.delete(`${API_BASE_URL}/chat/history/${profileId}/${userId}`),
  
  // Memories
  getMemories: (profileId, userId) => axios.get(`${API_BASE_URL}/memories/${profileId}/${userId}`),
  deleteMemory: (memoryId) => axios.delete(`${API_BASE_URL}/memories/${memoryId}`),
  clearAllMemories: (profileId, userId) => axios.delete(`${API_BASE_URL}/memories/${profileId}/${userId}/all`)
}

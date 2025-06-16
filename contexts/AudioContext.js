'use client'

import { createContext, useContext, useReducer, useEffect, useRef } from 'react'

const AudioContext = createContext()

// Audio Player State
const initialState = {
  // Current track
  currentTrack: null,
  
  // Player status
  isPlaying: false,
  isLoading: false,
  
  // Time controls
  currentTime: 0,
  duration: 0,
  
  // Volume controls
  volume: 0.7,
  isMuted: false,
  
  // Playlist controls
  queue: [],
  currentIndex: 0,
  
  // Player modes
  isShuffled: false,
  repeatMode: 'none', // 'none', 'one', 'all'
  
  // Error handling
  error: null,
}

// Audio Player Actions
const audioReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_TRACK':
      return {
        ...state,
        currentTrack: action.payload,
        isLoading: true,
        error: null,
      }
    
    case 'SET_PLAYING':
      return {
        ...state,
        isPlaying: action.payload,
        isLoading: false,
      }
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    
    case 'SET_TIME':
      return {
        ...state,
        currentTime: action.payload.currentTime,
        duration: action.payload.duration,
      }
    
    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.payload,
      }
    
    case 'TOGGLE_MUTE':
      return {
        ...state,
        isMuted: !state.isMuted,
      }
    
    case 'SET_QUEUE':
      return {
        ...state,
        queue: action.payload.queue,
        currentIndex: action.payload.index || 0,
      }
    
    case 'NEXT_TRACK':
      const nextIndex = state.currentIndex + 1
      if (nextIndex < state.queue.length) {
        return {
          ...state,
          currentIndex: nextIndex,
          currentTrack: state.queue[nextIndex],
        }
      }
      return state
    
    case 'PREVIOUS_TRACK':
      const prevIndex = state.currentIndex - 1
      if (prevIndex >= 0) {
        return {
          ...state,
          currentIndex: prevIndex,
          currentTrack: state.queue[prevIndex],
        }
      }
      return state
    
    case 'TOGGLE_SHUFFLE':
      return {
        ...state,
        isShuffled: !state.isShuffled,
      }
    
    case 'SET_REPEAT_MODE':
      const modes = ['none', 'one', 'all']
      const currentModeIndex = modes.indexOf(state.repeatMode)
      const nextModeIndex = (currentModeIndex + 1) % modes.length
      return {
        ...state,
        repeatMode: modes[nextModeIndex],
      }
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    
    case 'RESET_PLAYER':
      return {
        ...initialState,
        volume: state.volume, // Keep user's volume preference
      }
    
    default:
      return state
  }
}

// Audio Provider Component
export function AudioProvider({ children }) {
  const [state, dispatch] = useReducer(audioReducer, initialState)
  const audioRef = useRef(null)
  
  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio()
      
      // Audio event listeners
      const audio = audioRef.current
      
      const handleLoadStart = () => {
        dispatch({ type: 'SET_LOADING', payload: true })
      }
      
      const handleCanPlay = () => {
        dispatch({ type: 'SET_LOADING', payload: false })
        dispatch({ 
          type: 'SET_TIME', 
          payload: { 
            currentTime: 0, 
            duration: audio.duration || 0 
          } 
        })
      }
      
      const handleTimeUpdate = () => {
        dispatch({ 
          type: 'SET_TIME', 
          payload: { 
            currentTime: audio.currentTime, 
            duration: audio.duration || 0 
          } 
        })
      }
      
      const handleEnded = () => {
        // Handle track ended based on repeat mode
        if (state.repeatMode === 'one') {
          audio.currentTime = 0
          audio.play()
        } else if (state.repeatMode === 'all' || state.currentIndex < state.queue.length - 1) {
          dispatch({ type: 'NEXT_TRACK' })
        } else {
          dispatch({ type: 'SET_PLAYING', payload: false })
        }
      }
      
      const handleError = () => {
        dispatch({ 
          type: 'SET_ERROR', 
          payload: 'Failed to load audio' 
        })
      }
      
      // Attach event listeners
      audio.addEventListener('loadstart', handleLoadStart)
      audio.addEventListener('canplay', handleCanPlay)
      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener('ended', handleEnded)
      audio.addEventListener('error', handleError)
      
      // Cleanup
      return () => {
        audio.removeEventListener('loadstart', handleLoadStart)
        audio.removeEventListener('canplay', handleCanPlay)
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('ended', handleEnded)
        audio.removeEventListener('error', handleError)
      }
    }
  }, [state.repeatMode, state.currentIndex, state.queue.length])
  
  // Update audio source when track changes
  useEffect(() => {
    if (audioRef.current && state.currentTrack) {
      audioRef.current.src = state.currentTrack.audio_url || ''
      dispatch({ type: 'SET_LOADING', payload: true })
    }
  }, [state.currentTrack])
  
  // Update audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.isMuted ? 0 : state.volume
    }
  }, [state.volume, state.isMuted])
  
  // Play/Pause control
  useEffect(() => {
    if (audioRef.current) {
      if (state.isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Audio play failed:', error)
          dispatch({ type: 'SET_ERROR', payload: error.message })
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [state.isPlaying])
  
  // Audio Player Actions
  const actions = {
    // Play specific track
    playTrack: (track, queue = [], index = 0) => {
      dispatch({ type: 'SET_CURRENT_TRACK', payload: track })
      if (queue.length > 0) {
        dispatch({ type: 'SET_QUEUE', payload: { queue, index } })
      }
      dispatch({ type: 'SET_PLAYING', payload: true })
    },
    
    // Toggle play/pause
    togglePlay: () => {
      if (state.currentTrack) {
        dispatch({ type: 'SET_PLAYING', payload: !state.isPlaying })
      }
    },
    
    // Stop playback
    stop: () => {
      dispatch({ type: 'SET_PLAYING', payload: false })
      if (audioRef.current) {
        audioRef.current.currentTime = 0
      }
    },
    
    // Seek to specific time
    seekTo: (time) => {
      if (audioRef.current) {
        audioRef.current.currentTime = time
      }
    },
    
    // Set volume
    setVolume: (volume) => {
      dispatch({ type: 'SET_VOLUME', payload: Math.max(0, Math.min(1, volume)) })
    },
    
    // Toggle mute
    toggleMute: () => {
      dispatch({ type: 'TOGGLE_MUTE' })
    },
    
    // Next track
    nextTrack: () => {
      dispatch({ type: 'NEXT_TRACK' })
    },
    
    // Previous track
    previousTrack: () => {
      dispatch({ type: 'PREVIOUS_TRACK' })
    },
    
    // Toggle shuffle
    toggleShuffle: () => {
      dispatch({ type: 'TOGGLE_SHUFFLE' })
    },
    
    // Toggle repeat mode
    toggleRepeat: () => {
      dispatch({ type: 'SET_REPEAT_MODE' })
    },
    
    // Add to queue
    addToQueue: (tracks) => {
      const newQueue = [...state.queue, ...tracks]
      dispatch({ type: 'SET_QUEUE', payload: { queue: newQueue, index: state.currentIndex } })
    },
    
    // Clear error
    clearError: () => {
      dispatch({ type: 'SET_ERROR', payload: null })
    },
  }
  
  return (
    <AudioContext.Provider value={{ ...state, actions }}>
      {children}
    </AudioContext.Provider>
  )
}

// Hook to use Audio Context
export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
} 
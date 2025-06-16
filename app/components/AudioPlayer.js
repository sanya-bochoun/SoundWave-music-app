'use client'

import { useState, useEffect } from 'react'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Shuffle, 
  Repeat, 
  Repeat1,
  Music,
  Loader,
  Heart,
  List
} from 'lucide-react'
import { useAudio } from '../../contexts/AudioContext'

export default function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffled,
    repeatMode,
    queue,
    currentIndex,
    error,
    actions
  } = useAudio()

  const [showVolume, setShowVolume] = useState(false)
  const [showQueue, setShowQueue] = useState(false)

  // Format time helper
  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Progress bar percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  // Handle progress bar click
  const handleProgressClick = (e) => {
    if (!duration) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    actions.seekTo(newTime)
  }

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    actions.setVolume(newVolume)
  }

  // Get repeat icon
  const RepeatIcon = () => {
    switch (repeatMode) {
      case 'one':
        return <Repeat1 className="h-5 w-5" />
      case 'all':
        return <Repeat className="h-5 w-5 text-purple-400" />
      default:
        return <Repeat className="h-5 w-5" />
    }
  }

  // Don't render if no current track
  if (!currentTrack) return null

  return (
    <>
      {/* Main Audio Player */}
      <div className="fixed bottom-0 left-0 right-0 z-40 glass-effect border-t border-white/10 backdrop-blur-lg">
        <div className="max-w-screen-2xl mx-auto">
          {/* Progress Bar */}
          <div 
            className="w-full h-1 bg-gray-600 cursor-pointer hover:h-2 transition-all duration-200"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Player Content */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              
              {/* Track Info */}
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 rounded-lg flex items-center justify-center">
                    {currentTrack.cover_url ? (
                      <img 
                        src={currentTrack.cover_url} 
                        alt={currentTrack.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Music className="h-6 w-6 text-white" />
                    )}
                  </div>
                  {isLoading && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <Loader className="h-4 w-4 text-white animate-spin" />
                    </div>
                  )}
                </div>
                
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-white truncate">{currentTrack.title}</h4>
                  <p className="text-sm text-gray-400 truncate">{currentTrack.artist}</p>
                </div>

                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              {/* Main Controls */}
              <div className="flex items-center space-x-4">
                {/* Shuffle */}
                <button 
                  onClick={actions.toggleShuffle}
                  className={`p-2 rounded-full transition-colors ${
                    isShuffled ? 'text-purple-400 bg-purple-400/20' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Shuffle className="h-5 w-5" />
                </button>

                {/* Previous */}
                <button 
                  onClick={actions.previousTrack}
                  disabled={currentIndex === 0}
                  className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:hover:text-gray-400 transition-colors"
                >
                  <SkipBack className="h-6 w-6" />
                </button>

                {/* Play/Pause */}
                <button 
                  onClick={actions.togglePlay}
                  disabled={isLoading}
                  className="p-3 bg-white rounded-full text-black hover:bg-gray-200 disabled:opacity-50 transition-all duration-300 hover:scale-105"
                >
                  {isLoading ? (
                    <Loader className="h-6 w-6 animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6 ml-1" />
                  )}
                </button>

                {/* Next */}
                <button 
                  onClick={actions.nextTrack}
                  disabled={currentIndex >= queue.length - 1}
                  className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:hover:text-gray-400 transition-colors"
                >
                  <SkipForward className="h-6 w-6" />
                </button>

                {/* Repeat */}
                <button 
                  onClick={actions.toggleRepeat}
                  className={`p-2 rounded-full transition-colors ${
                    repeatMode !== 'none' ? 'text-purple-400 bg-purple-400/20' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <RepeatIcon />
                </button>
              </div>

              {/* Right Controls */}
              <div className="flex items-center space-x-4 flex-1 justify-end">
                {/* Time Display */}
                <div className="text-sm text-gray-400 hidden md:block">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>

                {/* Queue Button */}
                <button 
                  onClick={() => setShowQueue(!showQueue)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <List className="h-5 w-5" />
                </button>

                {/* Volume Control */}
                <div 
                  className="relative"
                  onMouseEnter={() => setShowVolume(true)}
                  onMouseLeave={() => setShowVolume(false)}
                >
                  <button 
                    onClick={actions.toggleMute}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                  
                  {showVolume && (
                    <div className="absolute bottom-full right-0 mb-2 p-2 glass-effect rounded-lg">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Queue Panel */}
      {showQueue && (
        <div className="fixed bottom-20 right-4 w-80 max-h-96 glass-effect border border-white/10 rounded-lg overflow-hidden z-50">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Queue ({queue.length})</h3>
              <button 
                onClick={() => setShowQueue(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="overflow-y-auto max-h-80">
            {queue.map((track, index) => (
              <div 
                key={track.id}
                className={`p-3 flex items-center space-x-3 hover:bg-white/5 cursor-pointer border-l-2 ${
                  index === currentIndex 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-transparent'
                }`}
                onClick={() => {
                  actions.playTrack(track, queue, index)
                  setShowQueue(false)
                }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded flex items-center justify-center text-xs font-semibold">
                  {index === currentIndex && isPlaying ? (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{track.title}</p>
                  <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                </div>
                <div className="text-xs text-gray-400">
                  {formatTime(track.duration)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <div className="fixed top-20 right-4 bg-red-500/90 text-white p-4 rounded-lg backdrop-blur-sm z-50">
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <button 
              onClick={actions.clearError}
              className="ml-4 text-white/80 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          border-radius: 50%;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  )
} 
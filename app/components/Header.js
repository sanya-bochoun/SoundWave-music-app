'use client'

import { useState } from 'react'
import { Search, Menu, X, Music, Heart, User, Download, Wifi, WifiOff } from 'lucide-react'
import { usePWA } from '../../hooks/usePWA'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  // PWA Hooks
  const { isInstallable, isInstalled, isOnline, installApp } = usePWA()

  return (
    <header className="relative z-50">
      <nav className="glass-effect border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                <Music className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">SoundWave</span>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2 border border-gray-600 rounded-full bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="Search for songs, artists, or playlists..."
                />
              </div>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Online/Offline Status */}
              <div className="flex items-center space-x-1">
                {isOnline ? (
                  <Wifi className="h-4 w-4 text-green-400" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-400" />
                )}
                <span className={`text-sm ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>

              {/* Install App Button */}
              {isInstallable && !isInstalled && (
                <button 
                  onClick={installApp}
                  className="flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full text-sm font-medium transition-all duration-300"
                >
                  <Download className="h-4 w-4" />
                  <span>Install App</span>
                </button>
              )}

              {/* App Installed Indicator */}
              {isInstalled && (
                <div className="flex items-center space-x-1 px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
                  <Download className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm">App Installed</span>
                </div>
              )}

              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>Favorites</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </a>
              <button className="btn-primary">
                Sign Up
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-effect">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2 border border-gray-600 rounded-full bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Search music..."
                  />
                </div>
              </div>
              
              <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors duration-300">
                Favorites
              </a>
              <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors duration-300">
                Profile
              </a>
              <div className="px-3 py-2">
                <button className="w-full btn-primary">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
'use client'

import { Play, Shuffle, Heart } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="animate-slide-up">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium">
                🎵 Now Trending
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Discover Your Next
              <span className="block gradient-text">Favorite Song</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Explore millions of tracks, create personalized playlists, and connect with music that moves your soul. Your perfect soundtrack awaits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="btn-primary flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Start Listening</span>
              </button>
              <button className="btn-secondary flex items-center justify-center space-x-2">
                <Shuffle className="h-5 w-5" />
                <span>Discover Music</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">50M+</div>
                <div className="text-gray-400 text-sm">Songs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">2M+</div>
                <div className="text-gray-400 text-sm">Artists</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">10M+</div>
                <div className="text-gray-400 text-sm">Playlists</div>
              </div>
            </div>
          </div>

          {/* Right Column - Featured Playlist Card */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Floating background elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float" />
              <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
              
              {/* Main Card */}
              <div className="relative music-card p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Today's Mix</h3>
                    <p className="text-gray-300">Personalized for you</p>
                  </div>
                  <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300">
                    <Heart className="h-6 w-6" />
                  </button>
                </div>

                {/* Album Art Mockup */}
                <div className="relative mb-6">
                  <div className="aspect-square bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 rounded-2xl flex items-center justify-center">
                    <div className="text-6xl">🎵</div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-full">
                    <Play className="h-4 w-4 text-white fill-current" />
                  </div>
                </div>

                {/* Track List Preview */}
                <div className="space-y-3">
                  {[
                    { title: "Electric Dreams", artist: "Neon Pulse", duration: "3:24" },
                    { title: "Midnight Vibes", artist: "Luna Sound", duration: "4:12" },
                    { title: "Digital Love", artist: "Cyber Hearts", duration: "3:45" },
                  ].map((track, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300 cursor-pointer">
                      <div>
                        <div className="font-medium">{track.title}</div>
                        <div className="text-sm text-gray-400">{track.artist}</div>
                      </div>
                      <div className="text-sm text-gray-400">{track.duration}</div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-full transition-all duration-300 flex items-center justify-center space-x-2">
                  <Play className="h-5 w-5 fill-current" />
                  <span>Play All</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
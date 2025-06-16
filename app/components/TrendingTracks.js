'use client'

import { Play, Heart, Download, Share2, TrendingUp } from 'lucide-react'

export default function TrendingTracks() {
  const tracks = [
    {
      id: 1,
      title: "Starlight Symphony",
      artist: "Luna Waves",
      album: "Cosmic Echoes",
      duration: "3:42",
      plays: "2.4M",
      trend: "+12%"
    },
    {
      id: 2,
      title: "Digital Dreams",
      artist: "Neon Circuit",
      album: "Electric Nights",
      duration: "4:15",
      plays: "1.8M",
      trend: "+8%"
    },
    {
      id: 3,
      title: "Ocean Breeze",
      artist: "Aqua Sound",
      album: "Natural Elements",
      duration: "3:28",
      plays: "3.1M",
      trend: "+15%"
    },
    {
      id: 4,
      title: "Midnight Drive",
      artist: "Urban Pulse",
      album: "City Lights",
      duration: "4:03",
      plays: "1.9M",
      trend: "+6%"
    },
    {
      id: 5,
      title: "Fire & Ice",
      artist: "Elemental",
      album: "Contrasts",
      duration: "3:51",
      plays: "2.7M",
      trend: "+18%"
    }
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-green-400" />
              <span>Trending <span className="gradient-text">Now</span></span>
            </h2>
            <p className="text-xl text-gray-300">
              The hottest tracks everyone's listening to right now
            </p>
          </div>
          <button className="hidden sm:block btn-secondary">
            View Chart
          </button>
        </div>

        <div className="glass-effect rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 text-sm font-medium text-gray-400">
            <div className="col-span-1">&nbsp;</div>
            <div className="col-span-5">TRACK</div>
            <div className="col-span-2">ALBUM</div>
            <div className="col-span-1">DURATION</div>
            <div className="col-span-2">PLAYS</div>
            <div className="col-span-1">ACTIONS</div>
          </div>

          {/* Track List */}
          <div className="divide-y divide-white/5">
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className="group p-6 hover:bg-white/5 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="grid lg:grid-cols-12 gap-4 items-center">
                  {/* Rank & Play Button */}
                  <div className="lg:col-span-1 flex items-center space-x-4 lg:space-x-2">
                    <div className="flex items-center justify-center w-8 h-8 text-lg font-bold text-gray-400 group-hover:text-white transition-colors duration-300">
                      {index + 1}
                    </div>
                    <button className="lg:opacity-0 group-hover:opacity-100 bg-green-500 hover:bg-green-600 p-2 rounded-full transition-all duration-300 transform hover:scale-105">
                      <Play className="h-4 w-4 text-white fill-current ml-0.5" />
                    </button>
                  </div>

                  {/* Track Info */}
                  <div className="lg:col-span-5 flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      {track.title.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                        {track.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{track.artist}</p>
                    </div>
                  </div>

                  {/* Album */}
                  <div className="lg:col-span-2 hidden lg:block">
                    <p className="text-gray-400 truncate">{track.album}</p>
                  </div>

                  {/* Duration */}
                  <div className="lg:col-span-1 hidden lg:block">
                    <p className="text-gray-400">{track.duration}</p>
                  </div>

                  {/* Plays & Trend */}
                  <div className="lg:col-span-2 flex flex-col lg:flex-row lg:items-center lg:space-x-2">
                    <span className="text-gray-300 font-medium">{track.plays}</span>
                    <span className="text-green-400 text-sm font-medium flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {track.trend}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-1 flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-300">
                      <Heart className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white transition-colors duration-300">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white transition-colors duration-300">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Mobile Info */}
                <div className="lg:hidden mt-3 flex items-center justify-between text-sm text-gray-400">
                  <span>{track.album}</span>
                  <span>{track.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="btn-primary">
            Load More Tracks
          </button>
        </div>
      </div>
    </section>
  )
}
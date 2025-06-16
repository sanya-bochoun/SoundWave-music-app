'use client'

import { Play, Heart, MoreHorizontal } from 'lucide-react'

export default function FeaturedPlaylists() {
  const playlists = [
    {
      id: 1,
      title: "Chill Vibes",
      description: "Perfect for relaxing and unwinding",
      tracks: 45,
      image: "🌊",
      color: "from-blue-600 to-cyan-500"
    },
    {
      id: 2,
      title: "Workout Beats",
      description: "High-energy tracks to fuel your workout",
      tracks: 62,
      image: "💪",
      color: "from-red-600 to-orange-500"
    },
    {
      id: 3,
      title: "Indie Discoveries",
      description: "Hidden gems from independent artists",
      tracks: 38,
      image: "🎸",
      color: "from-green-600 to-teal-500"
    },
    {
      id: 4,
      title: "Late Night Jazz",
      description: "Smooth jazz for evening moments",
      tracks: 29,
      image: "🎷",
      color: "from-purple-600 to-indigo-500"
    },
    {
      id: 5,
      title: "Electronic Pulse",
      description: "The best in electronic and EDM",
      tracks: 71,
      image: "⚡",
      color: "from-pink-600 to-rose-500"
    },
    {
      id: 6,
      title: "Acoustic Sessions",
      description: "Intimate acoustic performances",
      tracks: 34,
      image: "🪕",
      color: "from-amber-600 to-yellow-500"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Playlists</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Curated collections of the best music across all genres and moods
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {playlists.map((playlist, index) => (
            <div
              key={playlist.id}
              className="music-card p-6 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Playlist Cover */}
              <div className="relative mb-6">
                <div className={`aspect-square bg-gradient-to-br ${playlist.color} rounded-2xl flex items-center justify-center text-6xl mb-4 group-hover:scale-105 transition-transform duration-300`}>
                  {playlist.image}
                </div>
                <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-green-500 hover:bg-green-600 p-4 rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                    <Play className="h-6 w-6 text-white fill-current ml-1" />
                  </button>
                </div>
              </div>

              {/* Playlist Info */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors duration-300">
                    {playlist.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {playlist.description}
                  </p>
                </div>
                <button className="p-2 text-gray-400 hover:text-white transition-colors duration-300">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span>{playlist.tracks} tracks</span>
                <button className="text-gray-400 hover:text-red-400 transition-colors duration-300">
                  <Heart className="h-4 w-4" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 text-sm">
                  Play
                </button>
                <button className="flex-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 border border-purple-500/30 text-purple-300 font-medium py-2 px-4 rounded-full transition-all duration-300 text-sm">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-secondary">
            View All Playlists
          </button>
        </div>
      </div>
    </section>
  )
}
import { Music, Heart, Twitter, Instagram, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900/80 backdrop-blur-md border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                <Music className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">SoundWave</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Discover, explore, and enjoy amazing music from artists around the world. 
              Your perfect soundtrack is just a click away.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300">
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300">
                <Youtube className="h-5 w-5 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Discover</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">New Releases</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Top Charts</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Genres</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Artists</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Podcasts</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">About</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 SoundWave. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-gray-400 text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span>for music lovers everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
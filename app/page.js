'use client'

import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import FeaturedPlaylists from './components/FeaturedPlaylists'
import TrendingTracks from './components/TrendingTracks'
import Footer from './components/Footer'
import AudioPlayer from './components/AudioPlayer'
import PWAInstallPrompt from './components/PWAInstallPrompt'
import PWAStatus from './components/PWAStatus'
import { supabase, musicAPI } from '../lib/supabase'

export default function Home() {
  const [connectionStatus, setConnectionStatus] = useState('connecting')

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('🔍 Testing Supabase connection...')
        
        if (!supabase) {
          setConnectionStatus('error')
          console.error('❌ Supabase not configured')
          return
        }

        // Test connection and get songs
        const songs = await musicAPI.getSongs()
        console.log('✅ Supabase connected! Songs:', songs)
        
        // อัปเดต audio URLs สำหรับ demo
        try {
          await musicAPI.updateSampleAudioUrls()
          console.log('🎵 Audio URLs updated successfully')
        } catch (audioError) {
          console.warn('⚠️ Could not update audio URLs:', audioError.message)
        }
        
        setConnectionStatus('connected')
      } catch (error) {
        console.error('❌ Supabase connection failed:', error.message)
        setConnectionStatus('error')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-black/20"></div>
      <div className="fixed inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        
        {/* Connection Status */}
        <div className="container mx-auto px-4 py-2">
          <div className="text-center">
            {connectionStatus === 'connecting' && (
              <div className="text-white/70 text-sm">🔄 กำลังเชื่อมต่อฐานข้อมูล...</div>
            )}
            {connectionStatus === 'connected' && (
              <div className="text-green-400 text-sm">✅ เชื่อมต่อฐานข้อมูลสำเร็จ</div>
            )}
            {connectionStatus === 'error' && (
              <div className="text-red-400 text-sm">❌ ไม่สามารถเชื่อมต่อฐานข้อมูลได้</div>
            )}
          </div>
        </div>

        <Hero />
        <FeaturedPlaylists />
        <TrendingTracks />
        <Footer />
        
        {/* PWA Components */}
        <PWAInstallPrompt />
        <PWAStatus />
        
        {/* Audio Player - Fixed at bottom */}
        <AudioPlayer />
      </div>
    </div>
  )
}
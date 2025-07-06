'use client'

import { useState, useEffect } from 'react'
import { Download, X, Smartphone } from 'lucide-react'

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // ตรวจสอบว่าเป็น PWA ที่ติดตั้งแล้วหรือยัง
    const checkInstalled = () => {
      // PWA installed
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true)
        return
      }
      
      // iOS Safari standalone
      if (window.navigator.standalone === true) {
        setIsInstalled(true)
        return
      }
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      console.log('👋 PWA install prompt available')
      e.preventDefault()
      setDeferredPrompt(e)
      
      // แสดง prompt หลังจาก 3 วินาที
      setTimeout(() => {
        if (!isInstalled) {
          setShowInstallPrompt(true)
        }
      }, 3000)
    }

    // Listen for successful installation
    const handleAppInstalled = () => {
      console.log('🎉 PWA installed successfully!')
      setIsInstalled(true)
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
    }

    checkInstalled()
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [isInstalled])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      // แสดง install prompt
      deferredPrompt.prompt()
      
      // รอผลการตัดสินใจของ user
      const { outcome } = await deferredPrompt.userChoice
      
      console.log(`User response to install prompt: ${outcome}`)
      
      if (outcome === 'accepted') {
        console.log('✅ User accepted PWA installation')
      } else {
        console.log('❌ User dismissed PWA installation')
      }
      
      // ล้าง prompt
      setDeferredPrompt(null)
      setShowInstallPrompt(false)
    } catch (error) {
      console.error('Error installing PWA:', error)
    }
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    // ซ่อนไว้ 24 ชั่วโมง
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
  }

  // ไม่แสดงถ้าติดตั้งแล้วหรือไม่มี prompt
  if (isInstalled || !showInstallPrompt || !deferredPrompt) {
    return null
  }

  // ตรวจสอบว่า user เคย dismiss ไปแล้วหรือยัง (ภายใน 24 ชม.)
  const dismissedTime = localStorage.getItem('pwa-install-dismissed')
  if (dismissedTime && Date.now() - parseInt(dismissedTime) < 24 * 60 * 60 * 1000) {
    return null
  }

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="glass-effect border border-purple-500/30 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
            <Smartphone className="h-6 w-6 text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-white mb-1">
              Install SoundWave
            </h3>
            <p className="text-sm text-gray-300 mb-3">
              Get the full app experience! Install SoundWave for quick access and offline features.
            </p>
            
            <div className="flex gap-2">
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300"
              >
                <Download className="h-4 w-4" />
                Install
              </button>
              
              <button
                onClick={handleDismiss}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-2 rounded-lg text-sm transition-all duration-300"
              >
                Later
              </button>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
} 
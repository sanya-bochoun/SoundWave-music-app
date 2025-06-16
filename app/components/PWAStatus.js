'use client'

import { useState, useEffect } from 'react'
import { Monitor, Smartphone, Wifi, WifiOff } from 'lucide-react'

export default function PWAStatus() {
  const [isPWA, setIsPWA] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [installationStatus, setInstallationStatus] = useState('browser')

  useEffect(() => {
    // ตรวจสอบว่าเป็น PWA หรือไม่
    const checkPWAStatus = () => {
      // Desktop PWA
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsPWA(true)
        setInstallationStatus('pwa-desktop')
        return
      }
      
      // iOS PWA
      if (window.navigator.standalone === true) {
        setIsPWA(true)
        setInstallationStatus('pwa-ios')
        return
      }
      
      // Mobile browser
      if (window.innerWidth <= 768) {
        setInstallationStatus('mobile-browser')
      } else {
        setInstallationStatus('desktop-browser')
      }
    }

    // ตรวจสอบ online/offline status
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    checkPWAStatus()
    updateOnlineStatus()

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  const getStatusInfo = () => {
    switch (installationStatus) {
      case 'pwa-desktop':
        return {
          icon: <Monitor className="h-4 w-4" />,
          text: 'PWA Desktop',
          color: 'text-green-400'
        }
      case 'pwa-ios':
        return {
          icon: <Smartphone className="h-4 w-4" />,
          text: 'PWA iOS',
          color: 'text-green-400'
        }
      case 'mobile-browser':
        return {
          icon: <Smartphone className="h-4 w-4" />,
          text: 'Mobile Web',
          color: 'text-blue-400'
        }
      default:
        return {
          icon: <Monitor className="h-4 w-4" />,
          text: 'Desktop Web',
          color: 'text-blue-400'
        }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <div className="fixed top-4 right-4 z-40 md:top-20 md:right-4">
      <div className="glass-effect border border-white/10 rounded-lg px-3 py-2 flex items-center gap-2 text-sm">
        {/* PWA Status */}
        <div className={`flex items-center gap-1 ${statusInfo.color}`}>
          {statusInfo.icon}
          <span className="hidden sm:inline">{statusInfo.text}</span>
        </div>
        
        {/* Online/Offline Status */}
        <div className="w-px h-4 bg-white/20" />
        <div className={`flex items-center gap-1 ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
          {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
          <span className="hidden sm:inline">{isOnline ? 'Online' : 'Offline'}</span>
        </div>
      </div>
    </div>
  )
} 
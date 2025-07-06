'use client'

import { useEffect, useState } from 'react'

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [swRegistration, setSwRegistration] = useState(null)

  useEffect(() => {
    // ตรวจสอบว่าอยู่ใน browser environment
    if (typeof window === 'undefined') return

    // ตรวจสอบสถานะ online/offline
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    setIsOnline(navigator.onLine)

    // ตรวจสอบว่าแอปติดตั้งแล้วหรือยัง
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          window.navigator.standalone) {
        setIsInstalled(true)
      }
    }
    checkIfInstalled()

    // Register Service Worker
    const registerSW = async () => {
      if ('serviceWorker' in navigator) {
        try {
          console.log('[PWA] Registering Service Worker...')
          const registration = await navigator.serviceWorker.register('/sw.js')
          setSwRegistration(registration)
          console.log('[PWA] Service Worker registered successfully:', registration)

          // ตรวจสอบ updates
          registration.addEventListener('updatefound', () => {
            console.log('[PWA] New Service Worker version found')
            const newWorker = registration.installing
            
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('[PWA] New content available, please refresh')
                // สามารถแสดง notification ให้ user refresh ได้
              }
            })
          })

        } catch (error) {
          console.error('[PWA] Service Worker registration failed:', error)
        }
      }
    }

    registerSW()

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e) => {
      console.log('[PWA] Install prompt triggered')
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Listen for app installed
    const handleAppInstalled = () => {
      console.log('[PWA] App installed successfully')
      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('appinstalled', handleAppInstalled)

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  // Function ติดตั้งแอป
  const installApp = async () => {
    if (!deferredPrompt) {
      console.log('[PWA] Install prompt not available')
      return false
    }

    try {
      console.log('[PWA] Showing install prompt')
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      console.log(`[PWA] User response: ${outcome}`)
      
      if (outcome === 'accepted') {
        setIsInstalled(true)
      }
      
      setDeferredPrompt(null)
      setIsInstallable(false)
      
      return outcome === 'accepted'
    } catch (error) {
      console.error('[PWA] Install failed:', error)
      return false
    }
  }

  // Function สำหรับ background sync
  const syncData = async (tag = 'music-queue-sync') => {
    if (swRegistration && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        await swRegistration.sync.register(tag)
        console.log(`[PWA] Background sync registered: ${tag}`)
        return true
      } catch (error) {
        console.error('[PWA] Background sync failed:', error)
        return false
      }
    }
    return false
  }

  // Function สำหรับ push notifications
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      console.log('[PWA] Notifications not supported')
      return false
    }

    const permission = await Notification.requestPermission()
    console.log(`[PWA] Notification permission: ${permission}`)
    
    return permission === 'granted'
  }

  return {
    isInstallable,
    isInstalled,
    isOnline,
    swRegistration,
    installApp,
    syncData,
    requestNotificationPermission,
  }
} 
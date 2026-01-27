import { useState, useEffect } from 'react'
import { X, Download, Smartphone } from 'lucide-react'

const InstallPrompt = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Check if user already dismissed
    const dismissed = localStorage.getItem('installPromptDismissed')
    if (dismissed === 'true') {
      setIsVisible(false)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    setDeferredPrompt(null)
    setIsVisible(false)
    
    console.log(`User response to the install prompt: ${outcome}`)
  }

  const handleDismiss = () => {
    setDeferredPrompt(null)
    setIsVisible(false)
    localStorage.setItem('installPromptDismissed', 'true')
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-soft-lg border border-gray-200 p-4">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-kasu to-kasu-light flex items-center justify-center shrink-0">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-900">Install KASUWhisper</h3>
              <button
                onClick={handleDismiss}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Install the app for better experience and offline access
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            fullWidth
            onClick={handleDismiss}
          >
            Later
          </Button>
          <Button
            fullWidth
            icon={Download}
            onClick={handleInstall}
          >
            Install
          </Button>
        </div>
      </div>
    </div>
  )
}

export default InstallPrompt
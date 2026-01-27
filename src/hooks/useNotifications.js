import { useState, useEffect } from 'react'

const useNotifications = () => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Load notifications from localStorage
  useEffect(() => {
    const loadNotifications = () => {
      try {
        // Check if we're in browser environment
        if (typeof window === 'undefined') {
          setIsLoading(false)
          return
        }

        const savedNotifications = localStorage.getItem('kasuwhisper_notifications')
        
        if (savedNotifications) {
          const parsed = JSON.parse(savedNotifications)
          setNotifications(parsed)
          setUnreadCount(parsed.filter(n => !n.read).length)
        } else {
          // Default notifications
          const defaultNotifications = [
            {
              id: 1,
              title: 'Welcome to KASUWhisper!',
              message: 'Start sharing anonymous whispers with campus',
              type: 'system',
              read: true,
              timestamp: new Date(Date.now() - 3600000).toISOString()
            },
            {
              id: 2,
              title: 'Your whisper got 5 reactions',
              message: 'Anonymous students reacted to your post about campus WiFi',
              type: 'reaction',
              read: false,
              timestamp: new Date(Date.now() - 1800000).toISOString()
            },
            {
              id: 3,
              title: 'New comment on your post',
              message: 'Someone commented on your anonymous whisper',
              type: 'comment',
              read: false,
              timestamp: new Date(Date.now() - 900000).toISOString()
            },
            {
              id: 4,
              title: 'Added to Computer Science group',
              message: 'You were added to the Computer Science Society group',
              type: 'group',
              read: true,
              timestamp: new Date(Date.now() - 7200000).toISOString()
            },
            {
              id: 5,
              title: 'Someone mentioned you',
              message: 'You were mentioned in a whisper about study groups',
              type: 'mention',
              read: false,
              timestamp: new Date(Date.now() - 300000).toISOString()
            }
          ]
          setNotifications(defaultNotifications)
          setUnreadCount(defaultNotifications.filter(n => !n.read).length)
          localStorage.setItem('kasuwhisper_notifications', JSON.stringify(defaultNotifications))
        }
      } catch (error) {
        console.error('Error loading notifications:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadNotifications()
  }, [])

  // Save notifications to localStorage
  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      try {
        localStorage.setItem('kasuwhisper_notifications', JSON.stringify(notifications))
        setUnreadCount(notifications.filter(n => !n.read).length)
      } catch (error) {
        console.error('Error saving notifications:', error)
      }
    }
  }, [notifications, isLoading])

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      read: false,
      timestamp: new Date().toISOString()
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    addNotification
  }
}

export default useNotifications
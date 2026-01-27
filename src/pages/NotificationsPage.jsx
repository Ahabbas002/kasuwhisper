import { useState, useEffect } from 'react'
import {
  Bell,
  Check,
  Trash2,
  MessageSquare,
  Users,
  Heart,
  AtSign,
  Settings,
  Clock,
  Filter,
  Shield
} from 'lucide-react'
import Card from '../components/ui/Card'

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  // Initialize notifications
  useEffect(() => {
    const loadNotifications = () => {
      // Mock data
      const mockNotifications = [
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
      
      setNotifications(mockNotifications)
      setUnreadCount(mockNotifications.filter(n => !n.read).length)
      setIsLoading(false)
    }

    // Simulate API loading
    setTimeout(loadNotifications, 300)
  }, [])

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notif.read
    if (filter === 'read') return notif.read
    return true
  })

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'reaction':
        return <Heart className="w-5 h-5 text-red-500" />
      case 'comment':
        return <MessageSquare className="w-5 h-5 text-blue-500" />
      case 'group':
        return <Users className="w-5 h-5 text-green-500" />
      case 'mention':
        return <AtSign className="w-5 h-5 text-purple-500" />
      case 'system':
        return <Bell className="w-5 h-5 text-amber-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case 'reaction':
        return 'bg-red-50 border-red-200'
      case 'comment':
        return 'bg-blue-50 border-blue-200'
      case 'group':
        return 'bg-green-50 border-green-200'
      case 'mention':
        return 'bg-purple-50 border-purple-200'
      case 'system':
        return 'bg-amber-50 border-amber-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const formatRelativeTime = (timestamp) => {
    try {
      const now = new Date()
      const past = new Date(timestamp)
      const diffMs = now - past
      const diffMins = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)

      if (diffMins < 1) return 'Just now'
      if (diffMins < 60) return `${diffMins}m ago`
      if (diffHours < 24) return `${diffHours}h ago`
      if (diffDays < 7) return `${diffDays}d ago`
      return past.toLocaleDateString()
    } catch (error) {
      return 'Recently'
    }
  }

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    )
    setUnreadCount(0)
  }

  const deleteNotification = (id) => {
    const notificationToDelete = notifications.find(n => n.id === id)
    if (notificationToDelete && !notificationToDelete.read) {
      setUnreadCount(prev => Math.max(0, prev - 1))
    }
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
    setUnreadCount(0)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">Notifications</h1>
            <p className="text-gray-600">Stay updated with campus whispers</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Bell className="w-6 h-6 text-green-600" />
              </div>
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-sm font-semibold rounded-full flex items-center justify-center">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filter === 'all'
                  ? 'bg-green-600 text-white'
                  : 'text-green-600 border border-green-600 hover:bg-green-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filter === 'unread'
                  ? 'bg-green-600 text-white'
                  : 'text-green-600 border border-green-600 hover:bg-green-50'
              }`}
            >
              Unread ({notifications.filter(n => !n.read).length})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filter === 'read'
                  ? 'bg-green-600 text-white'
                  : 'text-green-600 border border-green-600 hover:bg-green-50'
              }`}
            >
              Read
            </button>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
                unreadCount === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'text-green-600 border border-green-600 hover:bg-green-50'
              }`}
            >
              <Check className="w-4 h-4" />
              Mark all as read
            </button>
            <button
              onClick={clearAll}
              disabled={notifications.length === 0}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
                notifications.length === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'text-red-600 border border-red-600 hover:bg-red-50'
              }`}
            >
              <Trash2 className="w-4 h-4" />
              Clear all
            </button>
          </div>
        </div>
      </Card>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <Card className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <Bell className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
          <p className="text-gray-600 mb-6">
            {filter === 'unread' 
              ? 'You have no unread notifications'
              : 'You have no notifications yet'}
          </p>
          <button
            onClick={() => setFilter('all')}
            className="px-6 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg font-medium transition-colors"
          >
            View all notifications
          </button>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-xl border transition-all duration-200 ${getNotificationColor(
                notification.type
              )} ${!notification.read ? 'ring-1 ring-green-500/20' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  !notification.read ? 'bg-white' : 'bg-gray-50'
                }`}>
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {notification.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {notification.message}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-3 h-3 bg-green-600 rounded-full shrink-0 mt-1"></div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {formatRelativeTime(notification.timestamp)}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-colors ${
                          notification.read
                            ? 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                            : 'text-green-600 bg-green-100 hover:bg-green-200'
                        }`}
                      >
                        {notification.read ? 'Read' : 'Mark as read'}
                      </button>
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete notification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-green-600">{notifications.length}</div>
          <div className="text-sm text-gray-600">Total Notifications</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
          <div className="text-sm text-gray-600">Unread</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-purple-600">
            {notifications.filter(n => n.type === 'comment').length}
          </div>
          <div className="text-sm text-gray-600">Comments</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-amber-600">
            {notifications.filter(n => n.type === 'reaction').length}
          </div>
          <div className="text-sm text-gray-600">Reactions</div>
        </div>
      </div>

      {/* Notification Settings */}
      <Card className="mt-8 p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Settings className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Notification Settings</h3>
              <p className="text-sm text-gray-600">Customize what notifications you receive</p>
            </div>
          </div>
          <button className="px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50 rounded-lg font-medium transition-colors">
            Configure
          </button>
        </div>
      </Card>
    </div>
  )
}

export default NotificationsPage
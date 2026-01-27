export const mockNotifications = [
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
    message: 'Anonymous students reacted to your post',
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
  }
]

// Then in your component, import and use this data
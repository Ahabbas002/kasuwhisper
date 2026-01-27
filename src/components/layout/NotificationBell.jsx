import { useState } from "react";
import { Bell } from "lucide-react";

const NotificationBell = () => {
  // Define notifications inline instead of importing
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
  ];

  const [unreadCount] = useState(() => {
    return mockNotifications.filter(n => !n.read).length;
  });

  return (
    <div className="relative">
      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <Bell className="w-5 h-5 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default NotificationBell;
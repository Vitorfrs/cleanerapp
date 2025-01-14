import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { getUnreadNotifications, markNotificationAsRead } from '../../services/notifications';
import { useAuth } from '../../contexts/AuthContext';

export function NotificationBell() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      const unread = await getUnreadNotifications(user.id);
      setNotifications(unread);
    };

    fetchNotifications();
    
    // Poll for new notifications
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const handleNotificationClick = async (notificationId: string) => {
    await markNotificationAsRead(notificationId);
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">Notifications</h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
                >
                  <h4 className="font-medium text-gray-900 mb-1">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-500 mt-2 block">
                    {new Date(notification.sent_at).toLocaleString()}
                  </span>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No new notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
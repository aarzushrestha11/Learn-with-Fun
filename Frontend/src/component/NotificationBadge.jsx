import React, { useEffect, useState } from 'react';
import { FcBriefcase } from "react-icons/fc";

const NotificationBadge = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notifications', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }

        const data = await response.json();
        const unreadNotifications = data.notifications.filter((notif) => !notif.read);
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="relative inline-block">
      <span className="text-xl font-semibold text-white hover:text-gray-300 cursor-pointer transition-all">
        <FcBriefcase className="inline-block mr-2" size={28} />
      </span>
      {unreadCount > 0 && (
        <span className="absolute bottom-2 right-0 bg-white text-black rounded-full text-xs font-bold px-2 py-1">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBadge;

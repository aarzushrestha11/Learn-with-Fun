import React, { useEffect, useState } from 'react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications
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
        console.log(data.notifications);
        setNotifications(data.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Mark a notification as read
  const handleMarkAsRead = async (id, status, feedback) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          feedback,
        }),
      });

      // Update UI after marking as read
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif._id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold text-gray-500">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-[url('/6.jpg')] bg-cover bg-center">
      <h1 className="text-4xl font-bold mb-6 text-blue-500 text-center mt-10">Notifications</h1>
      {notifications.length === 0 ? (
        <p className="text-lg text-gray-500">No notifications yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notifications.map((notif) => (
            <div
              key={notif._id}
              className={`relative p-6 h-[12rem] w-[25rem] bg-slate-50 border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl ${
                notif.read ? 'bg-slate-50' : 'bg-white'
              }`}
            >
              {/* Badge for read/unread status */}
              <span
                className={`absolute top-3 right-3 inline-block w-3 h-3 rounded-full ${
                  notif.read ? 'bg-green-500' : 'bg-red-500'
                }`}
              ></span>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-medium text-blue-600">{notif.message}</p>
                  <p className="text-sm text-gray-600 mt-2">Deadline: {notif.deadline || 'Not mentioned'}</p>
                  {notif.feedback && (
                    <p className="text-xl text-blue-700 mt-3">
                      <strong>Feedback:</strong> {notif.feedback}
                    </p>
                  )}
                </div>
              </div>

              {!notif.read && (
                <div className="mt-4 text-right">
                  <button
                    onClick={() => handleMarkAsRead(notif._id, 'read', notif.feedback)}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
                  >
                    Mark as Read
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;

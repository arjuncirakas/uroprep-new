import React, { useState } from 'react';
import { IoClose, IoNotificationsOutline } from 'react-icons/io5';
import { FaUserMd, FaFlask, FaCalendarAlt, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import { MdAssignment } from 'react-icons/md';

const NotificationModal = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'urgent',
      icon: FaExclamationCircle,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      title: 'Urgent Lab Results',
      message: 'Critical PSA levels detected for patient Ethan Carter. Immediate review required.',
      time: '5 minutes ago',
      isRead: false
    },
    {
      id: 2,
      type: 'appointment',
      icon: FaCalendarAlt,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      title: 'Appointment Reminder',
      message: 'MDT Discussion scheduled in 30 minutes. 3 new cases to review.',
      time: '10 minutes ago',
      isRead: false
    },
    {
      id: 3,
      type: 'lab',
      icon: FaFlask,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      title: 'Lab Results Available',
      message: 'Biopsy results for Noah Davis are now available for review.',
      time: '1 hour ago',
      isRead: false
    },
    {
      id: 4,
      type: 'task',
      icon: MdAssignment,
      iconColor: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      title: 'Task Due Soon',
      message: 'Follow-up report for Olivia Bennett due by end of day.',
      time: '2 hours ago',
      isRead: false
    },
    {
      id: 5,
      type: 'success',
      icon: FaCheckCircle,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      title: 'Patient Discharge Completed',
      message: 'Ava Foster has been successfully discharged. All documentation completed.',
      time: '3 hours ago',
      isRead: true
    },
    {
      id: 6,
      type: 'referral',
      icon: FaUserMd,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      title: 'New Referral Received',
      message: 'GP referral for new patient Michael Stevens. Review required.',
      time: '5 hours ago',
      isRead: true
    },
    {
      id: 7,
      type: 'appointment',
      icon: FaCalendarAlt,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      title: 'Appointment Confirmed',
      message: 'Liam Green confirmed for tomorrow at 9:00 AM.',
      time: '6 hours ago',
      isRead: true
    }
  ]);

  const [filter, setFilter] = useState('all'); // 'all', 'unread'

  if (!isOpen) return null;

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl flex flex-col w-full max-w-2xl max-h-[80vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4 rounded-t-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <IoNotificationsOutline className="text-white text-2xl" />
              <h2 className="text-xl font-bold text-white">Notifications</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-teal-700 p-2 rounded-lg transition-colors"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>
          
          {/* Unread count and Mark all as read */}
          <div className="flex items-center justify-between">
            <span className="text-teal-100 text-sm">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </span>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-white text-sm hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-gray-200 px-6 pt-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              filter === 'all'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              filter === 'unread'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 px-6">
              <IoNotificationsOutline className="text-6xl mb-4" />
              <p className="text-center">No notifications to display</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !notification.isRead ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex space-x-3">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${notification.bgColor} border ${notification.borderColor} flex items-center justify-center`}>
                        <IconComponent className={`text-lg ${notification.iconColor}`} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h3 className={`text-sm font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-teal-600 rounded-full ml-2 flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className={`text-sm mt-1 ${!notification.isRead ? 'text-gray-700' : 'text-gray-600'}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-lg">
          <button className="w-full text-center text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors">
            View All Notifications
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;


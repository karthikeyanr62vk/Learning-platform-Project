import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCheck } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export default function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, dismissNotification } = useNotification();
  const [isOpen, setIsOpen] = useState(false);

  const typeColors = {
    info: 'bg-blue-500',
    course: 'bg-primary',
    achievement: 'bg-secondary',
    reminder: 'bg-accent',
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-light transition-colors"
      >
        <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center"
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-dark-light rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h4 className="font-bold text-sm">Notifications</h4>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                </button>
              )}
            </div>

            <div className="max-h-72 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-center py-6 text-sm text-gray-500">No notifications</p>
              ) : (
                notifications.map((n) => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`flex items-start gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0 transition-colors ${
                      n.read ? 'opacity-60' : 'bg-primary/5'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${typeColors[n.type] || 'bg-gray-400'}`} />
                    <div className="flex-1 text-left">
                      <p className="text-sm text-gray-800 dark:text-gray-200">{n.message}</p>
                      <span className="text-xs text-gray-400">{n.time}</span>
                    </div>
                    <div className="flex gap-1">
                      {!n.read && (
                        <button onClick={() => markAsRead(n.id)} className="p-1 hover:bg-gray-100 dark:hover:bg-dark rounded">
                          <CheckCheck className="w-3.5 h-3.5 text-primary" />
                        </button>
                      )}
                      <button onClick={() => dismissNotification(n.id)} className="p-1 hover:bg-gray-100 dark:hover:bg-dark rounded">
                        <X className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

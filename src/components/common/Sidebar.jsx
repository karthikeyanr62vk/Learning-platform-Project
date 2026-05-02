import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, LayoutDashboard, BookOpen, Bookmark, Trophy, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourse } from '../../context/CourseContext';
import ProgressBar from './ProgressBar';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { enrolledCourses, bookmarkedCourses } = useCourse();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/courses', icon: BookOpen, label: 'My Courses', badge: enrolledCourses.length },
    { path: '/dashboard/bookmarks', icon: Bookmark, label: 'Bookmarks', badge: bookmarkedCourses.length },
    { path: '/dashboard/achievements', icon: Trophy, label: 'Achievements' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white dark:bg-dark-light border-r border-gray-200 dark:border-gray-700">
      {/* User info */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <img src={user?.avatar} alt="" className="w-11 h-11 rounded-full border-2 border-primary" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <div className="mt-3">
          <ProgressBar value={user?.streak || 0} max={30} label="Daily Streak" showPercentage={false} />
          <p className="text-center text-xs text-gray-500 mt-1">{user?.streak || 0} day streak</p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                  isActive ? 'bg-white/30 text-white' : 'bg-primary/10 text-primary'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-danger hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile sidebar */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed top-0 left-0 bottom-0 w-64 z-50 lg:hidden"
      >
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className="p-1 rounded-lg bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        {sidebarContent}
      </motion.div>
    </>
  );
}

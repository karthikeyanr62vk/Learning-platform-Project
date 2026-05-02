import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen, Trophy, Flame, Clock, TrendingUp, Award,
  ChevronRight, Play, CheckCircle, Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCourse } from '../context/CourseContext';
import { useNotification } from '../context/NotificationContext';
import { useProgress } from '../hooks/useProgress';
import CourseCard from '../components/common/CourseCard';
import ProgressBar from '../components/common/ProgressBar';
import Badge from '../components/common/Badge';
import { achievements } from '../data/mockData';

export default function Dashboard() {
  const { user } = useAuth();
  const { courses, enrolledCourses, bookmarkedCourses, toggleBookmark } = useCourse();
  const { unreadCount } = useNotification();
  const { calculateOverallProgress, getCompletedLessonsCount } = useProgress({ courses, enrolledCourses });

  const enrolled = courses.filter(c => enrolledCourses.includes(c.id));
  const bookmarked = courses.filter(c => bookmarkedCourses.includes(c.id));
  const overallProgress = calculateOverallProgress();
  const completedLessons = getCompletedLessonsCount();

  const stats = [
    { icon: BookOpen, label: 'Enrolled', value: enrolled.length, color: 'text-primary', bg: 'bg-primary/10' },
    { icon: CheckCircle, label: 'Completed', value: completedLessons, color: 'text-success', bg: 'bg-success/10' },
    { icon: Flame, label: 'Streak', value: `${user?.streak || 0} days`, color: 'text-accent', bg: 'bg-accent/10' },
    { icon: Trophy, label: 'Progress', value: `${overallProgress}%`, color: 'text-secondary', bg: 'bg-secondary/10' },
  ];

  const userProgress = {
    enrolled: enrolled.length,
    completedLessons,
    completedCourses: enrolled.filter(c => {
      const all = c.syllabus?.flatMap(m => m.lessons) || [];
      return all.length > 0 && all.every(l => l.completed);
    }).length,
    streak: user?.streak || 0,
    bookmarks: bookmarkedCourses.length,
    perfectQuizzes: 0,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back, <span className="gradient-text">{user?.name}</span>!
          </h1>
          <p className="text-gray-500 mt-1">Track your progress and continue learning</p>
          <Link to="/admin/login" className="inline-block mt-3">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium hover:bg-primary/20 transition-colors">
              Admin Panel →
            </span>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-dark-light rounded-2xl p-5 shadow-lg"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-dark-light rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Overall Progress</h2>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <ProgressBar value={overallProgress} label="Total Completion" />
        </motion.div>

        {/* Enrolled Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">My Courses</h2>
            <Link to="/courses" className="text-sm text-primary font-semibold flex items-center gap-1">
              Browse More <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          {enrolled.length === 0 ? (
            <div className="bg-white dark:bg-dark-light rounded-2xl p-8 text-center">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet</p>
              <Link to="/courses">
                <button className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors">
                  Browse Courses
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolled.map(course => {
                const allLessons = course.syllabus?.flatMap(m => m.lessons) || [];
                const completed = allLessons.filter(l => l.completed).length;
                const prog = allLessons.length > 0 ? Math.round((completed / allLessons.length) * 100) : 0;
                return (
                  <div key={course.id} className="relative">
                    <CourseCard course={course} progress={prog} showProgress />
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-secondary" /> Achievements
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {achievements.map(badge => {
              const earned = badge.condition(userProgress);
              return (
                <Badge
                  key={badge.id}
                  name={badge.name}
                  description={badge.description}
                  icon={badge.icon}
                  color={badge.color}
                  earned={earned}
                  size="md"
                />
              );
            })}
          </div>
        </motion.div>

        {/* Bookmarked */}
        {bookmarked.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <h2 className="text-xl font-bold mb-6">Bookmarked</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarked.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

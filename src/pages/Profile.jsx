import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  User, Mail, Calendar, BookOpen, Trophy, Flame,
  Edit2, Settings, Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCourse } from '../context/CourseContext';
import { useProgress } from '../hooks/useProgress';
import CourseCard from '../components/common/CourseCard';
import Badge from '../components/common/Badge';
import { achievements } from '../data/mockData';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';

export default function Profile() {
  const { user, logout } = useAuth();
  const { courses, enrolledCourses, bookmarkedCourses } = useCourse();
  const { calculateOverallProgress, getCompletedLessonsCount } = useProgress({ courses, enrolledCourses });

  const enrolled = courses.filter(c => enrolledCourses.includes(c.id));
  const overallProgress = calculateOverallProgress();
  const completedLessons = getCompletedLessonsCount();

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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-light rounded-2xl shadow-lg p-6 md:p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <img src={user.avatar} alt="" className="w-24 h-24 rounded-full border-4 border-primary" />
              <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-lg shadow-lg hover:bg-primary-dark transition-colors">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 mt-1">
                <Mail className="w-4 h-4" /> {user.email}
              </p>
              <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 mt-1">
                <Calendar className="w-4 h-4" /> Joined {user.joined}
              </p>
              {user.bio && <p className="text-gray-600 dark:text-gray-300 mt-3">{user.bio}</p>}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Settings className="w-4 h-4 mr-1" /> Settings</Button>
              <Button variant="ghost" size="sm" onClick={logout}>Logout</Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            {[
              { icon: BookOpen, label: 'Enrolled', value: enrolled.length },
              { icon: Trophy, label: 'Completed', value: completedLessons },
              { icon: Flame, label: 'Streak', value: `${user?.streak || 0} days` },
              { icon: Trophy, label: 'Progress', value: `${overallProgress}%` },
            ].map((stat, i) => (
              <div key={i} className="text-center p-3 bg-gray-50 dark:bg-dark rounded-xl">
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="font-bold text-lg">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="mt-6">
            <ProgressBar value={overallProgress} label="Overall Learning Progress" />
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-secondary" /> Achievements
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {achievements.map(badge => (
              <Badge
                key={badge.id}
                name={badge.name}
                description={badge.description}
                icon={badge.icon}
                color={badge.color}
                earned={badge.condition(userProgress)}
                size="md"
              />
            ))}
          </div>
        </motion.div>

        {/* Enrolled Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold mb-6">My Courses</h2>
          {enrolled.length === 0 ? (
            <div className="bg-white dark:bg-dark-light rounded-2xl p-8 text-center">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No enrolled courses yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolled.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

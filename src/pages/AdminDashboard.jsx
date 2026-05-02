import { motion } from 'framer-motion';
import {
  BookOpen, Users, TrendingUp, DollarSign,
  BarChart3, Calendar, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCourse } from '../context/CourseContext';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { courses, enrolledCourses } = useCourse();
  const { admin } = useAuth();

  const totalCourses = courses.length;
  const totalEnrollments = enrolledCourses.length;
  const totalRevenue = courses.reduce((sum, c) => sum + (c.discountedPrice || c.price), 0);
  const avgRating = (courses.reduce((sum, c) => sum + c.rating, 0) / totalCourses).toFixed(1);

  const stats = [
    { icon: BookOpen, label: 'Total Courses', value: totalCourses, color: 'text-primary', bg: 'bg-primary/10' },
    { icon: Users, label: 'Total Enrollments', value: totalEnrollments, color: 'text-secondary', bg: 'bg-secondary/10' },
    { icon: DollarSign, label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, color: 'text-success', bg: 'bg-success/10' },
    { icon: BarChart3, label: 'Avg Rating', value: avgRating, color: 'text-accent', bg: 'bg-accent/10' },
  ];

  const recentCourses = [...courses].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome, <span className="gradient-text">{admin?.name || 'Admin'}</span>
        </h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your platform</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-dark-light rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Recent Courses</h2>
            <Link to="/admin/courses" className="text-sm text-primary font-semibold flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentCourses.map(course => (
              <div key={course.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-dark transition-colors">
                <img src={course.thumbnail} alt="" className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{course.title}</p>
                  <p className="text-xs text-gray-500">{course.category}</p>
                </div>
                <span className="text-sm font-bold text-primary">${course.discountedPrice || course.price}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-dark-light rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/admin/courses/add">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Add New Course</p>
                  <p className="text-xs text-gray-500">Create a new course</p>
                </div>
              </motion.button>
            </Link>
            <Link to="/admin/courses">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Manage Courses</p>
                  <p className="text-xs text-gray-500">Edit or remove courses</p>
                </div>
              </motion.button>
            </Link>
            <Link to="/admin/students">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Manage Students</p>
                  <p className="text-xs text-gray-500">View student progress</p>
                </div>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

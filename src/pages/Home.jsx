import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Trophy, Star, ArrowRight, Play, ChevronRight } from 'lucide-react';
import CourseCard from '../components/common/CourseCard';
import { useCourse } from '../context/CourseContext';
import { categories } from '../data/mockData';

const stats = [
  { icon: BookOpen, label: 'Courses', value: '500+' },
  { icon: Users, label: 'Students', value: '50K+' },
  { icon: Trophy, label: 'Instructors', value: '200+' },
  { icon: Star, label: 'Rating', value: '4.8' },
];

const testimonials = [
  { name: 'Sarah M.', role: 'Web Developer', text: 'Learnify transformed my career. The courses are top-notch!', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarahm' },
  { name: 'Alex K.', role: 'Data Scientist', text: 'Best platform for learning new skills. Highly recommended!', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alexk' },
  { name: 'Priya S.', role: 'Designer', text: 'The UI/UX course was incredible. Loved every lesson!', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priyas' },
];

export default function Home() {
  const { courses, getCourseById } = useCourse();
  const featuredCourses = [1, 2, 6].map(id => getCourseById(id)).filter(Boolean);

  return (
    <div className="min-h-screen bg-white dark:bg-dark">
      {/* Hero Section */}
      <section className="gradient-bg-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6"
            >
              Learn Without<br />
              <span className="text-yellow-300">Limits</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-white/80 mb-8 max-w-xl"
            >
              Master new skills with our interactive courses. From coding to design,
              we've got everything you need to grow your career.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/courses">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-white text-primary font-bold px-8 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <Play className="w-5 h-5" />
                  Start Learning
                </motion.button>
              </Link>
              <Link to="/courses">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-3.5 rounded-xl border-2 border-white/30 hover:bg-white/30 transition-colors"
                >
                  Explore Courses
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 glass rounded-2xl p-5 space-y-4 w-44"
          >
            {stats.slice(0, 3).map((stat, i) => (
              <div key={i} className="flex items-center gap-3 text-white">
                <div className="p-2 bg-white/20 rounded-lg">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-lg">{stat.value}</p>
                  <p className="text-xs text-white/70">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats bar (mobile) */}
      <section className="bg-white dark:bg-dark-light border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-around">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="font-bold text-sm">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Featured Courses</h2>
            <p className="text-gray-500 mt-1">Handpicked courses by our experts</p>
          </div>
          <Link to="/courses" className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 dark:bg-dark-light/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Explore Categories</h2>
            <p className="text-gray-500">Find the perfect course for your goals</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.filter(c => c !== 'All').map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to="/courses">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2.5 rounded-full bg-white dark:bg-dark-light shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 font-medium text-sm hover:text-primary hover:border-primary transition-all"
                  >
                    {cat}
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">What Our Students Say</h2>
          <p className="text-gray-500">Real feedback from real learners</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-dark-light p-6 rounded-2xl shadow-lg"
            >
              <div className="flex text-yellow-400 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt="" className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

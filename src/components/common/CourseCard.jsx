import { motion } from 'framer-motion';
import { Star, Users, Clock, Bookmark, BookOpen, TrendingUp } from 'lucide-react';
import { useCourse } from '../../context/CourseContext';
import { useNavigate } from 'react-router-dom';

export default function CourseCard({ course, progress = null, showProgress = false }) {
  const { isBookmarked, toggleBookmark, isEnrolled } = useCourse();
  const navigate = useNavigate();
  const bookmarked = isBookmarked(course.id);
  const enrolled = isEnrolled(course.id);

  const levelColors = {
    'Beginner': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'Intermediate': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    'Advanced': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white dark:bg-dark-light rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/courses/${course.id}`)}
    >
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${levelColors[course.level]}`}>
            {course.level}
          </span>
          {course.discountedPrice && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-accent text-white">
              SALE
            </span>
          )}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); toggleBookmark(course.id); }}
          className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-white text-white' : 'text-white'}`} />
        </button>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-sm">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> {course.students.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1 mb-1.5">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-bold">{course.rating}</span>
          <span className="text-xs text-gray-500 ml-1">{course.category}</span>
        </div>

        <h3 className="font-bold text-gray-800 dark:text-gray-200 line-clamp-2 mb-1.5 group-hover:text-primary transition-colors">
          {course.title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">by {course.instructor}</p>

        {showProgress && progress !== null && (
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">Progress</span>
              <span className="text-primary font-bold">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-dark rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-bg-card rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-1">
            {course.discountedPrice ? (
              <>
                <span className="text-lg font-bold text-primary">${course.discountedPrice}</span>
                <span className="text-sm text-gray-400 line-through">${course.price}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-primary">${course.price}</span>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/courses/${course.id}`); }}
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            {enrolled ? 'Continue' : 'View'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

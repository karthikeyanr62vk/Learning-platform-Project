import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useCourse } from '../../context/CourseContext';

export default function SearchBar({ className = '', compact = false }) {
  const { searchQuery, setSearchQuery, courses } = useCourse();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const filtered = searchQuery.length > 0
    ? courses.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <div className={`relative ${className}`}>
      <div className={`flex items-center gap-2 bg-gray-100 dark:bg-dark-light rounded-xl px-4 py-2.5 transition-all ${
        isFocused ? 'ring-2 ring-primary shadow-lg' : ''
      }`}>
        <Search className="w-4 h-4 text-gray-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={compact ? 'Search...' : 'Search courses, instructors...'}
          className="bg-transparent outline-none flex-1 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')}>
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isFocused && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-light rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {filtered.map((course) => (
              <a
                key={course.id}
                href={`/courses/${course.id}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-dark transition-colors"
              >
                <img src={course.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{course.title}</p>
                  <p className="text-xs text-gray-500">{course.instructor}</p>
                </div>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

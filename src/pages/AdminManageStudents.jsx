import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Users, BookOpen, Trophy, Flame,
  Mail, Calendar
} from 'lucide-react';
import { students } from '../data/mockData';
import { useCourse } from '../context/CourseContext';

export default function AdminManageStudents() {
  const { courses, enrolledCourses } = useCourse();
  const [searchQuery, setSearchQuery] = useState('');

  const getStudentProgress = (student) => {
    const studentCourses = courses.filter(c => student.enrolledCourses?.includes(c.id));
    const allLessons = studentCourses.flatMap(c => c.syllabus?.flatMap(m => m.lessons) || []);
    const completed = allLessons.filter(l => l.completed).length;
    const total = allLessons.length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { courseCount: studentCourses.length, completedLessons: completed, progress };
  };

  const filtered = students.filter(s => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
  });

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Manage Students</h1>
          <p className="text-gray-500 mt-1">{students.length} total students</p>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-dark-light rounded-2xl p-4 shadow-lg mb-6"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none text-sm"
          />
        </div>
      </motion.div>

      {/* Students Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-dark-light rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-dark border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left p-4 font-semibold">Student</th>
                <th className="text-left p-4 font-semibold">Email</th>
                <th className="text-center p-4 font-semibold">Courses</th>
                <th className="text-center p-4 font-semibold">Lessons</th>
                <th className="text-center p-4 font-semibold">Progress</th>
                <th className="text-center p-4 font-semibold">Streak</th>
                <th className="text-left p-4 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student, i) => {
                const progress = getStudentProgress(student);
                return (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-dark transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={student.avatar} alt="" className="w-8 h-8 rounded-full" />
                        <span className="font-medium">{student.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{student.email}</td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
                        <BookOpen className="w-3 h-3" /> {progress.courseCount}
                      </span>
                    </td>
                    <td className="p-4 text-center text-gray-600 dark:text-gray-400">
                      {progress.completedLessons}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-20 h-1.5 bg-gray-200 dark:bg-dark rounded-full overflow-hidden">
                          <div
                            className="h-full gradient-bg-card rounded-full"
                            style={{ width: `${progress.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-primary">{progress.progress}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 text-orange-500">
                        <Flame className="w-3.5 h-3.5" /> {student.streak || 0}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 text-xs">{student.joined}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-800">
          {filtered.map((student, i) => {
            const progress = getStudentProgress(student);
            return (
              <motion.div
                key={student.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img src={student.avatar} alt="" className="w-10 h-10 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-xs text-gray-500 truncate">{student.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <BookOpen className="w-3 h-3" /> {progress.courseCount} courses
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <Trophy className="w-3 h-3" /> {progress.completedLessons} lessons
                  </div>
                  <div className="flex items-center gap-1 text-orange-500">
                    <Flame className="w-3 h-3" /> {student.streak || 0} day streak
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Calendar className="w-3 h-3" /> {student.joined}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-200 dark:bg-dark rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-bg-card rounded-full"
                        style={{ width: `${progress.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-primary">{progress.progress}%</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No students found</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

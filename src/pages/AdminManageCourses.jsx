import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Plus, Pencil, Trash2, Eye, Search, Filter,
  ChevronDown, X
} from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import { categories } from '../data/mockData';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';

export default function AdminManageCourses() {
  const { courses, deleteCourse } = useCourse();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = courses.filter(c => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDelete = (course) => {
    deleteCourse(course.id);
    setDeleteConfirm(null);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Manage Courses</h1>
          <p className="text-gray-500 mt-1">{courses.length} total courses</p>
        </div>
        <Link to="/admin/courses/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Course
          </Button>
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-dark-light rounded-2xl p-4 shadow-lg mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none text-sm"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-primary outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Courses Table */}
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
                <th className="text-left p-4 font-semibold">Course</th>
                <th className="text-left p-4 font-semibold">Category</th>
                <th className="text-left p-4 font-semibold">Price</th>
                <th className="text-left p-4 font-semibold">Students</th>
                <th className="text-left p-4 font-semibold">Rating</th>
                <th className="text-right p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((course, i) => (
                <motion.tr
                  key={course.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-dark transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={course.thumbnail} alt="" className="w-12 h-8 rounded-lg object-cover" />
                      <div className="min-w-0">
                        <p className="font-medium truncate max-w-xs">{course.title}</p>
                        <p className="text-xs text-gray-500">{course.instructor}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {course.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-primary">
                      ${course.discountedPrice || course.price}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">
                    {course.students.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span> {course.rating}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/courses/${course.id}`} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark transition-colors" title="View">
                        <Eye className="w-4 h-4 text-gray-500" />
                      </Link>
                      <Link to={`/admin/courses/edit/${course.id}`} className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" title="Edit">
                        <Pencil className="w-4 h-4 text-blue-500" />
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm(course)}
                        className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-danger" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-800">
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-4"
            >
              <div className="flex items-start gap-3">
                <img src={course.thumbnail} alt="" className="w-20 h-14 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{course.title}</p>
                  <p className="text-xs text-gray-500">{course.instructor}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
                      {course.category}
                    </span>
                    <span className="text-sm font-bold text-primary">${course.discountedPrice || course.price}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-1 mt-3">
                <Link to={`/courses/${course.id}`} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark transition-colors">
                  <Eye className="w-4 h-4 text-gray-500" />
                </Link>
                <Link to={`/admin/courses/edit/${course.id}`} className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <Pencil className="w-4 h-4 text-blue-500" />
                </Link>
                <button onClick={() => setDeleteConfirm(course)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <Trash2 className="w-4 h-4 text-danger" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No courses found</p>
          </div>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Confirm Delete"
        size="sm"
      >
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete <strong>"{deleteConfirm?.title}"</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={() => setDeleteConfirm(null)}>
            Cancel
          </Button>
          <Button variant="danger" className="flex-1" onClick={() => handleDelete(deleteConfirm)}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, BookOpen, GripVertical } from 'lucide-react';
import { categories } from '../data/mockData';
import Button from '../components/common/Button';

export default function AdminCourseForm({ initialData = null, onSubmit, submitLabel = 'Save Course' }) {
  const isEdit = !!initialData;

  const [form, setForm] = useState(initialData || {
    title: '',
    instructor: '',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + Date.now(),
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop',
    category: 'Web Development',
    level: 'Beginner',
    duration: '',
    price: '',
    discountedPrice: '',
    description: '',
    syllabus: [{ module: '', lessons: [{ title: '', duration: '45 min' }] }],
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.instructor.trim()) errs.instructor = 'Instructor is required';
    if (!form.duration.trim()) errs.duration = 'Duration is required';
    if (!form.price || form.price <= 0) errs.price = 'Valid price is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const courseData = {
      ...form,
      price: parseFloat(form.price),
      discountedPrice: form.discountedPrice ? parseFloat(form.discountedPrice) : undefined,
      syllabus: form.syllabus.map(mod => ({
        module: mod.module,
        lessons: mod.lessons.map((l, i) => ({
          id: Date.now() + Math.random(),
          title: l.title,
          duration: l.duration,
          completed: false,
        })),
      })),
    };
    onSubmit(courseData);
  };

  const addModule = () => {
    setForm(prev => ({
      ...prev,
      syllabus: [...prev.syllabus, { module: '', lessons: [{ title: '', duration: '45 min' }] }],
    }));
  };

  const updateModule = (index, value) => {
    setForm(prev => ({
      ...prev,
      syllabus: prev.syllabus.map((m, i) => i === index ? { ...m, module: value } : m),
    }));
  };

  const addLesson = (moduleIndex) => {
    setForm(prev => ({
      ...prev,
      syllabus: prev.syllabus.map((m, i) =>
        i === moduleIndex ? { ...m, lessons: [...m.lessons, { title: '', duration: '45 min' }] } : m
      ),
    }));
  };

  const updateLesson = (moduleIndex, lessonIndex, field, value) => {
    setForm(prev => ({
      ...prev,
      syllabus: prev.syllabus.map((m, i) =>
        i === moduleIndex ? {
          ...m,
          lessons: m.lessons.map((l, j) => j === lessonIndex ? { ...l, [field]: value } : l)
        } : m
      ),
    }));
  };

  const removeModule = (index) => {
    setForm(prev => ({
      ...prev,
      syllabus: prev.syllabus.filter((_, i) => i !== index),
    }));
  };

  const removeLesson = (moduleIndex, lessonIndex) => {
    setForm(prev => ({
      ...prev,
      syllabus: prev.syllabus.map((m, i) =>
        i === moduleIndex ? { ...m, lessons: m.lessons.filter((_, j) => j !== lessonIndex) } : m
      ),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-dark-light rounded-2xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1.5">Course Title</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none text-sm"
              placeholder="e.g. Complete Web Development Bootcamp"
            />
            {errors.title && <p className="text-danger text-xs mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Instructor Name</label>
            <input
              type="text"
              value={form.instructor}
              onChange={e => setForm(prev => ({ ...prev, instructor: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none text-sm"
              placeholder="e.g. Sarah Johnson"
            />
            {errors.instructor && <p className="text-danger text-xs mt-1">{errors.instructor}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Instructor Avatar URL</label>
            <input
              type="text"
              value={form.instructorAvatar}
              onChange={e => setForm(prev => ({ ...prev, instructorAvatar: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none text-sm"
              placeholder="https://..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1.5">Thumbnail URL</label>
            <input
              type="text"
              value={form.thumbnail}
              onChange={e => setForm(prev => ({ ...prev, thumbnail: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none text-sm"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Category</label>
            <select
              value={form.category}
              onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none text-sm"
            >
              {categories.filter(c => c !== 'All').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Level</label>
            <select
              value={form.level}
              onChange={e => setForm(prev => ({ ...prev, level: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none text-sm"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Duration</label>
            <input
              type="text"
              value={form.duration}
              onChange={e => setForm(prev => ({ ...prev, duration: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none text-sm"
              placeholder="e.g. 48 hours"
            />
            {errors.duration && <p className="text-danger text-xs mt-1">{errors.duration}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Price ($)</label>
            <input
              type="number"
              value={form.price}
              onChange={e => setForm(prev => ({ ...prev, price: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none text-sm"
              placeholder="89.99"
              min="0"
              step="0.01"
            />
            {errors.price && <p className="text-danger text-xs mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Discounted Price ($) <span className="text-gray-400 font-normal">(optional)</span></label>
            <input
              type="number"
              value={form.discountedPrice}
              onChange={e => setForm(prev => ({ ...prev, discountedPrice: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none text-sm"
              placeholder="49.99"
              min="0"
              step="0.01"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
              rows="4"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none text-sm resize-none"
              placeholder="Describe what students will learn in this course..."
            />
            {errors.description && <p className="text-danger text-xs mt-1">{errors.description}</p>}
          </div>
        </div>
      </motion.div>

      {/* Syllabus */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-dark-light rounded-2xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Syllabus</h3>
          <Button type="button" variant="outline" size="sm" onClick={addModule}>
            <Plus className="w-4 h-4 mr-1" /> Add Module
          </Button>
        </div>

        <div className="space-y-4">
          {form.syllabus.map((mod, mi) => (
            <div key={mi} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <GripVertical className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={mod.module}
                  onChange={e => updateModule(mi, e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none text-sm"
                  placeholder={`Module ${mi + 1} title...`}
                />
                <button
                  type="button"
                  onClick={() => removeModule(mi)}
                  className="p-1.5 text-danger hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 ml-6">
                {mod.lessons.map((lesson, li) => (
                  <div key={li} className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-6">{li + 1}.</span>
                    <input
                      type="text"
                      value={lesson.title}
                      onChange={e => updateLesson(mi, li, 'title', e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none text-sm"
                      placeholder="Lesson title..."
                    />
                    <input
                      type="text"
                      value={lesson.duration}
                      onChange={e => updateLesson(mi, li, 'duration', e.target.value)}
                      className="w-24 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none text-sm"
                      placeholder="45 min"
                    />
                    <button
                      type="button"
                      onClick={() => removeLesson(mi, li)}
                      className="p-1 text-danger hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addLesson(mi)}
                  className="text-sm text-primary hover:underline ml-8"
                >
                  + Add Lesson
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Submit */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-end gap-3"
      >
        <Button type="submit" size="lg">
          {submitLabel}
        </Button>
      </motion.div>
    </form>
  );
}

import { motion } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCourse } from '../context/CourseContext';
import AdminCourseForm from './AdminCourseForm';
import Button from '../components/common/Button';

export default function AdminAddCourse() {
  const { addCourse } = useCourse();
  const navigate = useNavigate();

  const handleSubmit = (courseData) => {
    addCourse(courseData);
    navigate('/admin/courses');
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <Link to="/admin/courses">
          <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-light transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Add New Course</h1>
          <p className="text-gray-500 mt-1">Fill in the details to create a new course</p>
        </div>
      </motion.div>

      <AdminCourseForm
        onSubmit={handleSubmit}
        submitLabel="Create Course"
      />
    </div>
  );
}

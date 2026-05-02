import { motion } from 'framer-motion';
import { ArrowLeft, Pencil } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCourse } from '../context/CourseContext';
import AdminCourseForm from './AdminCourseForm';
import Button from '../components/common/Button';

export default function AdminEditCourse() {
  const { id } = useParams();
  const { getCourseById, updateCourse } = useCourse();
  const navigate = useNavigate();

  const course = getCourseById(id);

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
        <Link to="/admin/courses">
          <Button>Back to Courses</Button>
        </Link>
      </div>
    );
  }

  const initialData = {
    title: course.title,
    instructor: course.instructor,
    instructorAvatar: course.instructorAvatar,
    thumbnail: course.thumbnail,
    category: course.category,
    level: course.level,
    duration: course.duration,
    price: course.price.toString(),
    discountedPrice: course.discountedPrice?.toString() || '',
    description: course.description,
    syllabus: course.syllabus.map(mod => ({
      module: mod.module,
      lessons: mod.lessons.map(l => ({
        title: l.title,
        duration: l.duration,
      })),
    })),
  };

  const handleSubmit = (courseData) => {
    updateCourse(id, courseData);
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
          <h1 className="text-2xl md:text-3xl font-bold">Edit Course</h1>
          <p className="text-gray-500 mt-1">Update course details</p>
        </div>
      </motion.div>

      <AdminCourseForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Update Course"
      />
    </div>
  );
}

import { createContext, useContext, useState, useCallback } from 'react';
import { courses as initialCourses, quizzes } from '../data/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [courses, setCourses] = useLocalStorage('courses-data', initialCourses);
  const [enrolledCourses, setEnrolledCourses] = useLocalStorage('enrolled-courses', [1]);
  const [bookmarkedCourses, setBookmarkedCourses] = useLocalStorage('bookmarked-courses', [2, 3]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const enrollCourse = useCallback((courseId) => {
    setEnrolledCourses(prev => prev.includes(courseId) ? prev : [...prev, courseId]);
  }, [setEnrolledCourses]);

  const unenrollCourse = useCallback((courseId) => {
    setEnrolledCourses(prev => prev.filter(id => id !== courseId));
  }, [setEnrolledCourses]);

  const isEnrolled = useCallback((courseId) => {
    return enrolledCourses.includes(courseId);
  }, [enrolledCourses]);

  const toggleBookmark = useCallback((courseId) => {
    setBookmarkedCourses(prev =>
      prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
    );
  }, [setBookmarkedCourses]);

  const isBookmarked = useCallback((courseId) => {
    return bookmarkedCourses.includes(courseId);
  }, [bookmarkedCourses]);

  const toggleLessonComplete = useCallback((courseId, lessonId) => {
    setCourses(prev => prev.map(course => {
      if (course.id !== courseId) return course;
      return {
        ...course,
        syllabus: course.syllabus.map(mod => ({
          ...mod,
          lessons: mod.lessons.map(lesson =>
            lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson
          )
        }))
      };
    }));
  }, [setCourses]);

  const addCourse = useCallback((newCourse) => {
    setCourses(prev => {
      const maxId = prev.reduce((max, c) => Math.max(max, c.id), 0);
      const courseWithId = {
        ...newCourse,
        id: maxId + 1,
        rating: 0,
        students: 0,
        reviews: [],
      };
      return [...prev, courseWithId];
    });
  }, [setCourses]);

  const updateCourse = useCallback((courseId, updates) => {
    setCourses(prev => prev.map(c =>
      c.id === Number(courseId) ? { ...c, ...updates } : c
    ));
  }, [setCourses]);

  const deleteCourse = useCallback((courseId) => {
    setCourses(prev => prev.filter(c => c.id !== Number(courseId)));
    setEnrolledCourses(prev => prev.filter(id => id !== Number(courseId)));
    setBookmarkedCourses(prev => prev.filter(id => id !== Number(courseId)));
  }, [setCourses, setEnrolledCourses, setBookmarkedCourses]);

  const getCourseById = useCallback((id) => {
    return courses.find(c => c.id === Number(id)) || null;
  }, [courses]);

  const getFilteredCourses = useCallback(() => {
    return courses.filter(course => {
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesSearch = searchQuery === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [courses, selectedCategory, searchQuery]);

  const getEnrolledCourses = useCallback(() => {
    return courses.filter(c => enrolledCourses.includes(c.id));
  }, [courses, enrolledCourses]);

  const getBookmarkedCourses = useCallback(() => {
    return courses.filter(c => bookmarkedCourses.includes(c.id));
  }, [courses, bookmarkedCourses]);

  const getQuiz = useCallback((courseId) => {
    return quizzes[courseId] || null;
  }, []);

  const getStudents = useCallback(() => {
    return courses.map(c => ({
      courseId: c.id,
      courseTitle: c.title,
      enrolled: enrolledCourses.includes(c.id),
      enrolledCount: enrolledCourses.filter(id => id === c.id).length,
    }));
  }, [courses, enrolledCourses]);

  return (
    <CourseContext.Provider value={{
      courses,
      enrolledCourses,
      bookmarkedCourses,
      searchQuery,
      selectedCategory,
      setSearchQuery,
      setSelectedCategory,
      enrollCourse,
      unenrollCourse,
      isEnrolled,
      toggleBookmark,
      isBookmarked,
      toggleLessonComplete,
      addCourse,
      updateCourse,
      deleteCourse,
      getCourseById,
      getFilteredCourses,
      getEnrolledCourses,
      getBookmarkedCourses,
      getQuiz,
      getStudents,
    }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) throw new Error('useCourse must be used within CourseProvider');
  return context;
}

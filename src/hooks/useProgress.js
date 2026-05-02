import { useCallback } from 'react';

export function useProgress(courseContext) {
  const calculateCourseProgress = useCallback((course) => {
    if (!course?.syllabus) return 0;
    const allLessons = course.syllabus.flatMap(m => m.lessons);
    const completed = allLessons.filter(l => l.completed).length;
    return allLessons.length > 0 ? Math.round((completed / allLessons.length) * 100) : 0;
  }, []);

  const calculateOverallProgress = useCallback(() => {
    if (!courseContext?.enrolledCourses) return 0;
    const enrolled = courseContext.courses.filter(c =>
      courseContext.enrolledCourses.includes(c.id)
    );
    if (enrolled.length === 0) return 0;
    const total = enrolled.reduce((sum, c) => sum + calculateCourseProgress(c), 0);
    return Math.round(total / enrolled.length);
  }, [courseContext, calculateCourseProgress]);

  const getCompletedLessonsCount = useCallback(() => {
    if (!courseContext?.courses) return 0;
    return courseContext.courses
      .filter(c => courseContext.enrolledCourses.includes(c.id))
      .flatMap(c => c.syllabus?.flatMap(m => m.lessons) || [])
      .filter(l => l.completed).length;
  }, [courseContext]);

  return { calculateCourseProgress, calculateOverallProgress, getCompletedLessonsCount };
}

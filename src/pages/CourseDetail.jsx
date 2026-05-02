import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Clock, Users, Bookmark, BookOpen, Play, CheckCircle,
  ChevronDown, ChevronUp, ArrowLeft, Trophy, Send, RotateCcw
} from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import Modal from '../components/common/Modal';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCourseById, isEnrolled, enrollCourse, toggleBookmark, isBookmarked, toggleLessonComplete, getQuiz } = useCourse();
  const { isAuthenticated, user } = useAuth();
  const { addNotification } = useNotification();

  const course = getCourseById(id);
  const enrolled = isEnrolled(Number(id));
  const bookmarked = isBookmarked(Number(id));
  const quiz = getQuiz(Number(id));

  const [activeModule, setActiveModule] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course not found</h2>
          <Button onClick={() => navigate('/courses')}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  const allLessons = course.syllabus.flatMap(m => m.lessons);
  const completedLessons = allLessons.filter(l => l.completed).length;
  const progress = allLessons.length > 0 ? Math.round((completedLessons / allLessons.length) * 100) : 0;

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    enrollCourse(Number(id));
    addNotification(`Successfully enrolled in "${course.title}"`, 'course');
  };

  const handleToggleLesson = (lessonId) => {
    toggleLessonComplete(Number(id), lessonId);
    if (!allLessons.find(l => l.id === lessonId)?.completed) {
      addNotification('Great job! Lesson completed.', 'achievement');
    }
  };

  const handleQuizSubmit = () => {
    if (!quiz) return;
    let correct = 0;
    quiz.questions.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) correct++;
    });
    const score = Math.round((correct / quiz.questions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);
    if (score === 100) {
      addNotification('Perfect quiz score! Earned "Quiz Whiz" badge!', 'achievement');
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2.5 py-0.5 bg-primary text-white text-xs font-bold rounded-full">{course.category}</span>
              <span className="px-2.5 py-0.5 bg-white/20 text-white text-xs font-bold rounded-full">{course.level}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{course.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {course.rating}</span>
              <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {course.students.toLocaleString()} students</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {course.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-light rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold mb-4">About This Course</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{course.description}</p>
              <div className="flex items-center gap-3 mt-6 p-4 bg-gray-50 dark:bg-dark rounded-xl">
                <img src={course.instructorAvatar} alt="" className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-bold">{course.instructor}</p>
                  <p className="text-sm text-gray-500">Instructor</p>
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
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Course Syllabus
              </h2>
              {enrolled && (
                <div className="mb-4">
                  <ProgressBar value={progress} label="Overall Progress" />
                </div>
              )}
              <div className="space-y-3">
                {course.syllabus.map((mod, i) => (
                  <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setActiveModule(activeModule === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-dark transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                          {i + 1}
                        </span>
                        <span className="font-semibold text-left">{mod.module}</span>
                      </div>
                      {activeModule === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <AnimatePresence>
                      {activeModule === i && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-2">
                            {mod.lessons.map(lesson => (
                              <div
                                key={lesson.id}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark transition-colors"
                              >
                                {enrolled ? (
                                  <button onClick={() => handleToggleLesson(lesson.id)}>
                                    {lesson.completed ? (
                                      <CheckCircle className="w-5 h-5 text-success" />
                                    ) : (
                                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                                    )}
                                  </button>
                                ) : (
                                  <Play className="w-4 h-4 text-gray-400" />
                                )}
                                <span className={`flex-1 text-sm ${lesson.completed ? 'line-through text-gray-400' : ''}`}>
                                  {lesson.title}
                                </span>
                                <span className="text-xs text-gray-400">{lesson.duration}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-dark-light rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold mb-4">Student Reviews</h2>
              <div className="space-y-4">
                {course.reviews.map(review => (
                  <div key={review.id} className="flex gap-3 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <img src={review.avatar} alt="" className="w-10 h-10 rounded-full shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{review.user}</span>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                      <div className="flex text-yellow-400 mb-1">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enroll Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-dark-light rounded-2xl p-6 shadow-lg sticky top-24"
            >
              <div className="text-center mb-4">
                {course.discountedPrice ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-primary">${course.discountedPrice}</span>
                    <span className="text-lg text-gray-400 line-through">${course.price}</span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-primary">${course.price}</span>
                )}
              </div>

              {enrolled ? (
                <div className="space-y-3">
                  <div className="text-center text-sm text-success font-medium">You are enrolled!</div>
                  <ProgressBar value={progress} showPercentage={false} />
                  <p className="text-center text-xs text-gray-500">{completedLessons}/{allLessons.length} lessons completed</p>
                  {quiz && (
                    <Button variant="outline" className="w-full" onClick={() => setShowQuiz(true)}>
                      <Trophy className="w-4 h-4 mr-2" />
                      Take Quiz
                    </Button>
                  )}
                </div>
              ) : (
                <Button className="w-full" size="lg" onClick={handleEnroll}>
                  Enroll Now
                </Button>
              )}

              <button
                onClick={() => { toggleBookmark(Number(id)); }}
                className={`w-full mt-3 flex items-center justify-center gap-2 p-3 rounded-xl text-sm font-medium transition-colors ${
                  bookmarked
                    ? 'bg-primary/10 text-primary'
                    : 'bg-gray-100 dark:bg-dark text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-light'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                {bookmarked ? 'Bookmarked' : 'Bookmark this course'}
              </button>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2 text-sm text-gray-500">
                <div className="flex justify-between"><span>Duration:</span><span className="text-gray-800 dark:text-gray-200 font-medium">{course.duration}</span></div>
                <div className="flex justify-between"><span>Level:</span><span className="text-gray-800 dark:text-gray-200 font-medium">{course.level}</span></div>
                <div className="flex justify-between"><span>Students:</span><span className="text-gray-800 dark:text-gray-200 font-medium">{course.students.toLocaleString()}</span></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      <Modal isOpen={showQuiz} onClose={() => { setShowQuiz(false); resetQuiz(); }} title={`Quiz: ${quiz?.title || 'Course Quiz'}`} size="lg">
        {quiz && (
          <div className="space-y-6">
            {quiz.questions.map((q, i) => (
              <div key={q.id} className="p-4 bg-gray-50 dark:bg-dark rounded-xl">
                <p className="font-semibold mb-3">{i + 1}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, j) => (
                    <button
                      key={j}
                      disabled={quizSubmitted}
                      onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: j }))}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        quizSubmitted
                          ? j === q.correctAnswer
                            ? 'border-success bg-success/10 text-success'
                            : quizAnswers[q.id] === j
                              ? 'border-danger bg-danger/10 text-danger'
                              : 'border-gray-200 dark:border-gray-700'
                          : quizAnswers[q.id] === j
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {quizSubmitted && quizAnswers[q.id] !== q.correctAnswer && (
                  <p className="text-xs text-gray-500 mt-2"><strong>Explanation:</strong> {q.explanation}</p>
                )}
              </div>
            ))}

            {!quizSubmitted ? (
              <Button
                onClick={handleQuizSubmit}
                disabled={Object.keys(quizAnswers).length < quiz.questions.length}
                className="w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Quiz
              </Button>
            ) : (
              <div className="text-center space-y-4">
                <div className={`text-4xl font-bold ${quizScore === 100 ? 'text-success' : quizScore >= 60 ? 'text-primary' : 'text-danger'}`}>
                  {quizScore}%
                </div>
                <p className="text-sm text-gray-500">
                  {quizScore === 100 ? 'Perfect! Amazing job!' : quizScore >= 60 ? 'Good job! Keep learning!' : 'Keep practicing and try again!'}
                </p>
                <Button variant="outline" onClick={resetQuiz}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Quiz
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

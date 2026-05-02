export const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    instructorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop",
    rating: 4.8,
    students: 12540,
    duration: "48 hours",
    level: "Beginner",
    category: "Web Development",
    price: 89.99,
    discountedPrice: 49.99,
    description: "Master full-stack web development with HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and deploy them to the cloud.",
    syllabus: [
      {
        module: "Module 1: HTML & CSS Fundamentals",
        lessons: [
          { id: 101, title: "HTML5 Semantic Elements", duration: "45 min", completed: true },
          { id: 102, title: "CSS Flexbox & Grid", duration: "60 min", completed: true },
          { id: 103, title: "Responsive Design Principles", duration: "50 min", completed: false },
        ]
      },
      {
        module: "Module 2: JavaScript Essentials",
        lessons: [
          { id: 104, title: "ES6+ Features", duration: "55 min", completed: false },
          { id: 105, title: "DOM Manipulation", duration: "45 min", completed: false },
          { id: 106, title: "Async/Await & Promises", duration: "60 min", completed: false },
        ]
      },
      {
        module: "Module 3: React.js Deep Dive",
        lessons: [
          { id: 107, title: "Components & Props", duration: "50 min", completed: false },
          { id: 108, title: "State & Lifecycle", duration: "55 min", completed: false },
          { id: 109, title: "Hooks in Depth", duration: "65 min", completed: false },
          { id: 110, title: "Context API & State Management", duration: "50 min", completed: false },
        ]
      },
      {
        module: "Module 4: Backend with Node.js",
        lessons: [
          { id: 111, title: "Express.js Basics", duration: "45 min", completed: false },
          { id: 112, title: "REST API Design", duration: "60 min", completed: false },
          { id: 113, title: "MongoDB Integration", duration: "55 min", completed: false },
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Alex M.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", rating: 5, comment: "Excellent course! Transformed my career completely.", date: "2026-03-15" },
      { id: 2, user: "Priya K.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya", rating: 4, comment: "Great content, but some sections could be more detailed.", date: "2026-02-28" },
      { id: 3, user: "James L.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james", rating: 5, comment: "Best web dev course out there. The projects are fantastic!", date: "2026-04-10" },
    ]
  },
  {
    id: 2,
    title: "Data Science & Machine Learning",
    instructor: "Dr. Michael Chen",
    instructorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop",
    rating: 4.9,
    students: 8920,
    duration: "60 hours",
    level: "Intermediate",
    category: "Data Science",
    price: 129.99,
    discountedPrice: 79.99,
    description: "Learn Python, Pandas, NumPy, Scikit-Learn, and TensorFlow. Build ML models and analyze real datasets.",
    syllabus: [
      {
        module: "Module 1: Python for Data Science",
        lessons: [
          { id: 201, title: "Python Basics Refresher", duration: "40 min", completed: false },
          { id: 202, title: "NumPy Arrays & Operations", duration: "55 min", completed: false },
          { id: 203, title: "Pandas DataFrames", duration: "60 min", completed: false },
        ]
      },
      {
        module: "Module 2: Machine Learning Fundamentals",
        lessons: [
          { id: 204, title: "Supervised vs Unsupervised", duration: "45 min", completed: false },
          { id: 205, title: "Linear Regression", duration: "60 min", completed: false },
          { id: 206, title: "Classification Algorithms", duration: "70 min", completed: false },
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Sarah T.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=saraht", rating: 5, comment: "Incredibly thorough. The ML section is gold.", date: "2026-01-20" },
      { id: 2, user: "Rahul P.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul", rating: 5, comment: "Challenging but rewarding. Highly recommend!", date: "2026-03-05" },
    ]
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    instructor: "Emma Rodriguez",
    instructorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
    rating: 4.7,
    students: 6750,
    duration: "36 hours",
    level: "Beginner",
    category: "Design",
    price: 69.99,
    discountedPrice: 39.99,
    description: "Master Figma, design systems, user research, and prototyping. Create stunning interfaces that users love.",
    syllabus: [
      {
        module: "Module 1: Design Fundamentals",
        lessons: [
          { id: 301, title: "Color Theory & Typography", duration: "50 min", completed: false },
          { id: 302, title: "Layout & Composition", duration: "45 min", completed: false },
        ]
      },
      {
        module: "Module 2: Figma Essentials",
        lessons: [
          { id: 303, title: "Figma Interface & Tools", duration: "40 min", completed: false },
          { id: 304, title: "Components & Variants", duration: "55 min", completed: false },
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Lisa M.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa", rating: 5, comment: "Emma is an amazing instructor. Learned so much!", date: "2026-04-01" },
    ]
  },
  {
    id: 4,
    title: "Mobile App Development with Flutter",
    instructor: "David Kim",
    instructorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=450&fit=crop",
    rating: 4.6,
    students: 5430,
    duration: "42 hours",
    level: "Intermediate",
    category: "Mobile Development",
    price: 99.99,
    discountedPrice: 59.99,
    description: "Build cross-platform mobile apps with Flutter and Dart. Publish to both iOS and Android from a single codebase.",
    syllabus: [
      {
        module: "Module 1: Dart Programming",
        lessons: [
          { id: 401, title: "Dart Basics", duration: "50 min", completed: false },
          { id: 402, title: "Object-Oriented Dart", duration: "60 min", completed: false },
        ]
      },
      {
        module: "Module 2: Flutter Widgets",
        lessons: [
          { id: 403, title: "Stateless vs Stateful", duration: "45 min", completed: false },
          { id: 404, title: "Layout Widgets", duration: "55 min", completed: false },
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Tom W.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tom", rating: 4, comment: "Good course, wish there was more on state management.", date: "2026-02-15" },
    ]
  },
  {
    id: 5,
    title: "Digital Marketing Strategy",
    instructor: "Jennifer Lee",
    instructorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    rating: 4.5,
    students: 9870,
    duration: "30 hours",
    level: "Beginner",
    category: "Marketing",
    price: 59.99,
    discountedPrice: 34.99,
    description: "Master SEO, social media marketing, email campaigns, and Google Ads. Grow your business online.",
    syllabus: [
      {
        module: "Module 1: SEO Fundamentals",
        lessons: [
          { id: 501, title: "Keyword Research", duration: "40 min", completed: false },
          { id: 502, title: "On-Page SEO", duration: "45 min", completed: false },
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Mark R.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mark", rating: 5, comment: "Helped me grow my business traffic by 300%!", date: "2026-03-22" },
    ]
  },
  {
    id: 6,
    title: "Advanced React & Next.js",
    instructor: "Ryan Martinez",
    instructorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ryan",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
    rating: 4.9,
    students: 7230,
    duration: "40 hours",
    level: "Advanced",
    category: "Web Development",
    price: 109.99,
    discountedPrice: 69.99,
    description: "Deep dive into React Server Components, Next.js App Router, SSR, SSG, ISR, and performance optimization.",
    syllabus: [
      {
        module: "Module 1: Next.js App Router",
        lessons: [
          { id: 601, title: "Server vs Client Components", duration: "55 min", completed: false },
          { id: 602, title: "Routing & Layouts", duration: "50 min", completed: false },
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Nathan K.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nathan", rating: 5, comment: "Absolute must for any React developer.", date: "2026-04-18" },
    ]
  },
  {
    id: 7,
    title: "Python for Beginners",
    instructor: "Lisa Park",
    instructorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisap",
    thumbnail: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=800&h=450&fit=crop",
    rating: 4.8,
    students: 15680,
    duration: "25 hours",
    level: "Beginner",
    category: "Programming",
    price: 49.99,
    discountedPrice: 29.99,
    description: "Learn Python from scratch. Perfect for absolute beginners. Covers basics, data structures, and simple projects.",
    syllabus: [
      {
        module: "Module 1: Python Basics",
        lessons: [
          { id: 701, title: "Installation & Setup", duration: "30 min", completed: false },
          { id: 702, title: "Variables & Data Types", duration: "40 min", completed: false },
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Olivia S.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=olivia", rating: 5, comment: "Perfect for beginners. Very clear explanations.", date: "2026-01-10" },
    ]
  },
  {
    id: 8,
    title: "AWS Cloud Practitioner",
    instructor: "Alan Thompson",
    instructorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alan",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop",
    rating: 4.7,
    students: 11200,
    duration: "35 hours",
    level: "Beginner",
    category: "Cloud Computing",
    price: 79.99,
    discountedPrice: 44.99,
    description: "Master AWS fundamentals, cloud concepts, security, and prepare for the AWS Certified Cloud Practitioner exam.",
    syllabus: [
      {
        module: "Module 1: Cloud Concepts",
        lessons: [
          { id: 801, title: "What is Cloud Computing?", duration: "35 min", completed: false },
          { id: 802, title: "AWS Global Infrastructure", duration: "40 min", completed: false },
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Chris B.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chris", rating: 4, comment: "Great prep for the certification exam!", date: "2026-02-28" },
    ]
  }
];

export const categories = [
  "All",
  "Web Development",
  "Data Science",
  "Design",
  "Mobile Development",
  "Marketing",
  "Programming",
  "Cloud Computing",
];

export const quizzes = {
  1: {
    title: "Web Development Quiz",
    questions: [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
        correctAnswer: 0,
        explanation: "HTML stands for Hyper Text Markup Language."
      },
      {
        id: 2,
        question: "Which CSS property is used for flexbox layouts?",
        options: ["display: flex", "layout: flex", "flex: true", "display: block"],
        correctAnswer: 0,
        explanation: "The display: flex property activates flexbox layout."
      },
      {
        id: 3,
        question: "What hook is used for state in React?",
        options: ["useEffect", "useRef", "useState", "useContext"],
        correctAnswer: 2,
        explanation: "useState is the React hook for managing state in functional components."
      },
      {
        id: 4,
        question: "What does API stand for?",
        options: ["Application Programming Interface", "Advanced Program Integration", "Application Process Integration", "Automated Programming Interface"],
        correctAnswer: 0,
        explanation: "API stands for Application Programming Interface."
      },
      {
        id: 5,
        question: "Which HTTP method is used to create data?",
        options: ["GET", "POST", "PUT", "DELETE"],
        correctAnswer: 1,
        explanation: "POST is used to send data to create a new resource."
      }
    ]
  }
};

export const achievements = [
  { id: 1, name: "First Steps", description: "Enroll in your first course", icon: "trophy", color: "#f59e0b", condition: (progress) => progress.enrolled >= 1 },
  { id: 2, name: "Quick Learner", description: "Complete 3 lessons", icon: "zap", color: "#7c3aed", condition: (progress) => progress.completedLessons >= 3 },
  { id: 3, name: "Course Master", description: "Complete an entire course", icon: "award", color: "#ec4899", condition: (progress) => progress.completedCourses >= 1 },
  { id: 4, name: "Week Warrior", description: "Maintain a 7-day streak", icon: "flame", color: "#ef4444", condition: (progress) => progress.streak >= 7 },
  { id: 5, name: "Social Butterfly", description: "Bookmark 5 courses", icon: "bookmark", color: "#10b981", condition: (progress) => progress.bookmarks >= 5 },
  { id: 6, name: "Quiz Whiz", description: "Score 100% on a quiz", icon: "brain", color: "#3b82f6", condition: (progress) => progress.perfectQuizzes >= 1 },
];

export const mockNotifications = [
  { id: 1, message: "Welcome to Learnify! Start your learning journey today.", type: "info", read: false, time: "2 hours ago" },
  { id: 2, message: "New course available: Advanced React & Next.js", type: "course", read: false, time: "5 hours ago" },
  { id: 3, message: "Congratulations! You earned the 'First Steps' badge.", type: "achievement", read: true, time: "1 day ago" },
  { id: 4, message: "Don't forget to complete Lesson 2 in Web Development Bootcamp", type: "reminder", read: false, time: "2 days ago" },
];

export const mockUser = {
  id: 1,
  name: "Karthikeyan",
  email: "karth@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=karth",
  bio: "Passionate learner exploring the world of technology.",
  joined: "2026-01-15",
  streak: 5,
  enrolledCourses: [1],
  completedLessons: 2,
  completedCourses: 0,
  perfectQuizzes: 0,
  bookmarks: [2, 3],
};

export const adminUser = {
  email: "admin@learnify.com",
  password: "admin123",
  name: "Admin",
};

export const students = [
  { id: 1, name: "Karthikeyan", email: "karth@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=karth", enrolledCourses: [1], streak: 5, completedLessons: 2, joined: "2026-01-15" },
  { id: 2, name: "Priya Sharma", email: "priya@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya", enrolledCourses: [1, 2], streak: 12, completedLessons: 8, joined: "2026-02-10" },
  { id: 3, name: "Alex Chen", email: "alex@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", enrolledCourses: [3], streak: 3, completedLessons: 5, joined: "2026-03-05" },
  { id: 4, name: "Maria Garcia", email: "maria@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria", enrolledCourses: [2, 6], streak: 20, completedLessons: 15, joined: "2025-11-20" },
  { id: 5, name: "John Smith", email: "john@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john", enrolledCourses: [4, 5], streak: 7, completedLessons: 3, joined: "2026-01-28" },
  { id: 6, name: "Sarah Lee", email: "sarah@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah2", enrolledCourses: [1, 3, 7], streak: 15, completedLessons: 20, joined: "2025-12-15" },
  { id: 7, name: "Mike Ross", email: "mike@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike", enrolledCourses: [8], streak: 2, completedLessons: 1, joined: "2026-04-01" },
  { id: 8, name: "Emily Davis", email: "emily@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily", enrolledCourses: [6, 7], streak: 9, completedLessons: 12, joined: "2026-02-28" },
];

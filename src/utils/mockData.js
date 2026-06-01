export const roleLandingPath = {
  student: '/app/student',
  lecturer: '/app/lecturer',
  admin: '/app/admin',
}

export const roleNavigation = {
  student: [
    { label: 'Dashboard', path: '/app/student' },
    { label: 'Courses', path: '/app/student/courses' },
    { label: 'Assignments', path: '/app/student/assignments' },
    { label: 'CodeSpace', path: '/app/student/codespace' },
    { label: 'Announcements', path: '/app/announcements' },
    { label: 'Profile', path: '/app/profile' },
  ],
  lecturer: [
    { label: 'Dashboard', path: '/app/lecturer' },
    { label: 'Course Content', path: '/app/lecturer/courses' },
    { label: 'Assignments', path: '/app/lecturer/assignments' },
    { label: 'Coding Challenges', path: '/app/lecturer/problems' },
    { label: 'Quizzes', path: '/app/lecturer/quizzes' },
    { label: 'Gradebook', path: '/app/lecturer/gradebook' },
    { label: 'Student Progress', path: '/app/lecturer/progress' },
    { label: 'Discussions', path: '/app/lecturer/discussions' },
    { label: 'Announcements', path: '/app/announcements' },
    { label: 'Profile', path: '/app/profile' },
  ],
  admin: [
    { label: 'Dashboard', path: '/app/admin' },
    { label: 'Students', path: '/app/admin/students' },
    { label: 'Lecturers', path: '/app/admin/lecturers' },
    { label: 'Courses', path: '/app/admin/courses' },
    { label: 'CodeSpace', path: '/app/admin/codespace' },
    { label: 'Assignments', path: '/app/admin/assignments' },
    { label: 'Quizzes', path: '/app/admin/quizzes' },
    { label: 'Announcements', path: '/app/announcements' },
    { label: 'Reports', path: '/app/admin/reports' },
    { label: 'Settings', path: '/app/admin/settings' },
  ],
}

export const dashboardStats = {
  student: [
    { label: 'Enrolled Courses', value: '6', meta: '+2 this semester' },
    { label: 'Pending Assignments', value: '4', meta: '2 due this week' },
    { label: 'Coding Sessions', value: '18', meta: 'JavaScript leads' },
    { label: 'Average Grade', value: '84%', meta: 'Up from 79%' },
  ],
  lecturer: [
    { label: 'Active Courses', value: '5', meta: '3 published' },
    { label: 'Submissions Waiting', value: '31', meta: '12 overdue reviews' },
    { label: 'Coding Tasks', value: '9', meta: 'Across 3 courses' },
    { label: 'Student Reach', value: '286', meta: 'Across all classes' },
  ],
  admin: [
    { label: 'Students', value: '1,248', meta: '+64 this month' },
    { label: 'Lecturers', value: '74', meta: '8 departments' },
    { label: 'Courses', value: '122', meta: '17 coding enabled' },
    { label: 'Active Courses', value: '98', meta: '80% active this term' },
    { label: 'Assignments Submitted', value: '856', meta: '22 due today' },
    { label: 'Coding Exercises Completed', value: '4,320', meta: '12 new this week' },
  ],
}

export const announcements = [
  {
    title: 'Mid-semester assessment schedule released',
    audience: 'All students',
    time: 'Today',
  },
  {
    title: 'SEG 312 coding assignment deadline moved to Friday',
    audience: 'Software Engineering 300L',
    time: '2 hours ago',
  },
  {
    title: 'Firebase workshop for lecturers this weekend',
    audience: 'Lecturers',
    time: 'Yesterday',
  },
]

export const studentCourses = [
  {
    code: 'SEN 301',
    title: 'Software Architecture',
    lecturer: 'Dr. Musa Lecturer',
    level: '300 Level',
    department: 'Software Engineering',
    status: 'Enrolled',
    credits: '3 Units',
    lessons: 18,
    format: 'Blended',
    summary: 'System design patterns, architectural styles, and documentation for scalable software systems.',
  },
  {
    code: 'CSC 305',
    title: 'Database Systems',
    lecturer: 'Prof. N. Ibe',
    level: '300 Level',
    department: 'Computer Science',
    status: 'Open',
    credits: '2 Units',
    lessons: 14,
    format: 'On Campus',
    summary: 'Relational modeling, SQL practice, normalization, and transaction concepts for data-intensive applications.',
  },
  {
    code: 'SEN 307',
    title: 'Web Engineering',
    lecturer: 'Engr. E. Okafor',
    level: '300 Level',
    department: 'Software Engineering',
    status: 'Popular',
    credits: '3 Units',
    lessons: 22,
    format: 'Online',
    summary: 'Modern frontend architecture, backend integration, testing workflows, and deployment fundamentals.',
  },
  {
    code: 'CSC 311',
    title: 'Algorithms and Complexity',
    lecturer: 'Dr. T. Bello',
    level: '300 Level',
    department: 'Computer Science',
    status: 'Recommended',
    credits: '3 Units',
    lessons: 16,
    format: 'Blended',
    summary: 'Greedy strategies, dynamic programming, asymptotic analysis, and performance tradeoffs in software design.',
  },
  {
    code: 'SEN 315',
    title: 'Software Quality Assurance',
    lecturer: 'Mrs. A. Danjuma',
    level: '300 Level',
    department: 'Software Engineering',
    status: 'New',
    credits: '2 Units',
    lessons: 12,
    format: 'Online',
    summary: 'Testing strategy, quality metrics, defect tracking, and release readiness for professional engineering teams.',
  },
]

export const assignments = [
  {
    title: 'REST API Design Review',
    course: 'SEN 301',
    deadline: 'May 27, 2026',
    status: 'Pending',
  },
  {
    title: 'Database Normalization Report',
    course: 'CSC 305',
    deadline: 'May 30, 2026',
    status: 'Submitted',
  },
  {
    title: 'Monaco Editor Integration',
    course: 'SEN 307',
    deadline: 'June 2, 2026',
    status: 'Coding Task',
  },
]

export const codingProblems = [
  {
    title: 'Implement Stack Using Arrays',
    language: 'JavaScript',
    difficulty: 'Easy',
    topic: 'Data Structures',
  },
  {
    title: 'Student Grade Analyzer',
    language: 'Python',
    difficulty: 'Medium',
    topic: 'Functions and Lists',
  },
  {
    title: 'Shortest Path in Campus Map',
    language: 'C++',
    difficulty: 'Hard',
    topic: 'Graphs',
  },
]

export const usersTable = [
  {
    name: 'Ray Student',
    role: 'Student',
    department: 'Software Engineering',
    status: 'Active',
  },
  {
    name: 'Dr. Musa Lecturer',
    role: 'Lecturer',
    department: 'Computer Science',
    status: 'Active',
  },
  {
    name: 'Admin Officer',
    role: 'Admin',
    department: 'ICT Unit',
    status: 'Active',
  },
]

export const courseManagementRows = [
  {
    course: 'SEN 301 - Software Architecture',
    owner: 'Dr. Musa Lecturer',
    materials: '12 files',
    students: '84',
  },
  {
    course: 'SEN 307 - Web Engineering',
    owner: 'Engr. E. Okafor',
    materials: '18 files',
    students: '101',
  },
]

export const adminStudents = [
  {
    name: 'John Doe',
    matricNo: 'CSC001',
    department: 'Computer Science',
    level: '300',
    status: 'Active',
  },
  {
    name: 'Sara Bello',
    matricNo: 'CSC014',
    department: 'Software Engineering',
    level: '200',
    status: 'Active',
  },
  {
    name: 'Tunde Ade',
    matricNo: 'CSC029',
    department: 'Information Systems',
    level: '400',
    status: 'Suspended',
  },
]

export const adminLecturers = [
  {
    name: 'Dr. Musa Lecturer',
    email: 'musa@selms.dev',
    department: 'Computer Science',
    courses: '3',
    status: 'Active',
  },
  {
    name: 'Prof. Amina Yusuf',
    email: 'amina@selms.dev',
    department: 'Software Engineering',
    courses: '4',
    status: 'Active',
  },
]

export const adminAssignments = [
  {
    title: 'Design a UML Diagram',
    course: 'SEN 301',
    dueDate: '20/06/2026',
    status: 'Open',
  },
  {
    title: 'Database Normalization Report',
    course: 'CSC 305',
    dueDate: '25/06/2026',
    status: 'Submitted',
  },
]

export const adminQuizData = [
  {
    title: 'Software Engineering Basics',
    type: 'Multiple Choice',
    timeLimit: '30 mins',
    status: 'Draft',
  },
  {
    title: 'Intro to Algorithms',
    type: 'True/False',
    timeLimit: '20 mins',
    status: 'Published',
  },
]

export const adminCodingChallenges = [
  {
    challenge: 'Build a Login Page',
    language: 'JavaScript',
    deadline: '12/06/2026',
    status: 'Open',
  },
  {
    challenge: 'Student Grade Analyzer',
    language: 'Python',
    deadline: '18/06/2026',
    status: 'Draft',
  },
]

export const adminReports = [
  {
    label: 'Active Students',
    value: '1,024',
    meta: '68% increase month over month',
  },
  {
    label: 'Course Completion',
    value: '73%',
    meta: 'On track with goals',
  },
  {
    label: 'Daily Logins',
    value: '1,684',
    meta: 'Peak at 10am',
  },
]

export const lecturerCourses = [
  {
    code: 'SEN 301',
    title: 'Software Architecture',
    students: 84,
    completion: '72%',
    pendingReviews: 12,
    nextClass: 'Tue, 9:00 AM',
    contentHealth: 'Strong',
  },
  {
    code: 'SEN 307',
    title: 'Web Engineering',
    students: 101,
    completion: '64%',
    pendingReviews: 19,
    nextClass: 'Thu, 11:00 AM',
    contentHealth: 'Needs quiz',
  },
  {
    code: 'CSC 401',
    title: 'Software Requirements Engineering',
    students: 76,
    completion: '58%',
    pendingReviews: 8,
    nextClass: 'Fri, 8:00 AM',
    contentHealth: 'New upload due',
  },
]

export const courseContentItems = [
  {
    course: 'CSC 401',
    title: 'Week 1 Notes',
    type: 'Lecture Notes',
    format: 'PDF',
    visibility: 'Published',
    updated: 'Today',
  },
  {
    course: 'CSC 401',
    title: 'Requirements Engineering.pdf',
    type: 'Reading',
    format: 'PDF',
    visibility: 'Published',
    updated: 'Yesterday',
  },
  {
    course: 'SEN 307',
    title: 'Testing Lecture.mp4',
    type: 'Video',
    format: 'MP4',
    visibility: 'Draft',
    updated: 'May 29',
  },
  {
    course: 'SEN 301',
    title: 'Architecture Case Study Slides',
    type: 'Slides',
    format: 'PPTX',
    visibility: 'Published',
    updated: 'May 27',
  },
]

export const lecturerAssignments = [
  {
    title: 'Design a Use Case Diagram',
    course: 'CSC 401',
    deadline: 'June 15, 2026',
    submissions: '42 / 76',
    grading: '18 pending',
    status: 'Open',
  },
  {
    title: 'REST API Design Review',
    course: 'SEN 301',
    deadline: 'June 6, 2026',
    submissions: '66 / 84',
    grading: '12 pending',
    status: 'Reviewing',
  },
  {
    title: 'Frontend Testing Report',
    course: 'SEN 307',
    deadline: 'June 20, 2026',
    submissions: '0 / 101',
    grading: 'Not started',
    status: 'Draft',
  },
]

export const submissionQueue = [
  {
    student: 'Ada Yusuf',
    item: 'Use Case Diagram',
    course: 'CSC 401',
    submitted: '2 hours ago',
    score: 'Pending',
  },
  {
    student: 'Tomi Ade',
    item: 'REST API Design Review',
    course: 'SEN 301',
    submitted: 'Yesterday',
    score: 'Pending',
  },
  {
    student: 'Ray Student',
    item: 'Database Normalization Report',
    course: 'CSC 305',
    submitted: 'May 30',
    score: '82%',
  },
]

export const lecturerCodingChallenges = [
  {
    title: 'Build a Student Registration System',
    course: 'SEN 307',
    language: 'Java',
    difficulty: 'Medium',
    submissions: '28',
    reviewStatus: 'Needs review',
  },
  {
    title: 'Implement Stack Using Arrays',
    course: 'SEN 301',
    language: 'JavaScript',
    difficulty: 'Easy',
    submissions: '61',
    reviewStatus: 'Active',
  },
  {
    title: 'Shortest Path in Campus Map',
    course: 'CSC 401',
    language: 'Python',
    difficulty: 'Hard',
    submissions: '14',
    reviewStatus: 'Draft tests',
  },
]

export const quizzes = [
  {
    title: 'Quiz 1: Requirements Basics',
    course: 'CSC 401',
    questions: '10',
    duration: '20 mins',
    status: 'Published',
    averageScore: '74%',
  },
  {
    title: 'Architecture Pattern Check',
    course: 'SEN 301',
    questions: '12',
    duration: '25 mins',
    status: 'Draft',
    averageScore: '-',
  },
  {
    title: 'React State Quiz',
    course: 'SEN 307',
    questions: '8',
    duration: '15 mins',
    status: 'Scheduled',
    averageScore: '-',
  },
]

export const gradebookRows = [
  {
    student: 'Ada Yusuf',
    course: 'CSC 401',
    assignments: '86%',
    quizzes: '78%',
    projects: '91%',
    final: '85%',
    status: 'Approved',
  },
  {
    student: 'Tomi Ade',
    course: 'SEN 301',
    assignments: '72%',
    quizzes: '81%',
    projects: '69%',
    final: '74%',
    status: 'Feedback due',
  },
  {
    student: 'Ray Student',
    course: 'SEN 307',
    assignments: '88%',
    quizzes: '84%',
    projects: '79%',
    final: '84%',
    status: 'Ready',
  },
]

export const studentProgressRows = [
  {
    student: 'Ada Yusuf',
    attendance: '92%',
    assignments: '8 / 9',
    quizzes: '4 / 4',
    progress: 'Advanced',
    risk: 'Low',
  },
  {
    student: 'Tomi Ade',
    attendance: '68%',
    assignments: '5 / 9',
    quizzes: '3 / 4',
    progress: 'Needs follow-up',
    risk: 'High',
  },
  {
    student: 'Ray Student',
    attendance: '84%',
    assignments: '7 / 9',
    quizzes: '4 / 4',
    progress: 'On track',
    risk: 'Medium',
  },
]

export const discussionThreads = [
  {
    title: 'Trouble understanding UML relationships',
    course: 'CSC 401',
    student: 'Ada Yusuf',
    replies: '6',
    status: 'Lecturer replied',
    latest: '20 mins ago',
  },
  {
    title: 'Which testing strategy fits sprint projects?',
    course: 'SEN 307',
    student: 'Ray Student',
    replies: '3',
    status: 'Open',
    latest: '1 hour ago',
  },
  {
    title: 'Clarification on layered architecture diagram',
    course: 'SEN 301',
    student: 'Tomi Ade',
    replies: '9',
    status: 'Resolved',
    latest: 'Yesterday',
  },
]

export const platformHighlights = [
  'Firebase Authentication for role-based sign in',
  'Firestore-ready collections for users, courses, assignments, and coding work',
  'Responsive dashboards for student, lecturer, and admin workflows',
  'CodeSpace module ready for Monaco and Judge0 or Piston integration',
]

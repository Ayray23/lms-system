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
    { label: 'Courses', path: '/app/lecturer/courses' },
    { label: 'Assignments', path: '/app/lecturer/assignments' },
    { label: 'Coding Problems', path: '/app/lecturer/problems' },
    { label: 'Announcements', path: '/app/announcements' },
    { label: 'Profile', path: '/app/profile' },
  ],
  admin: [
    { label: 'Dashboard', path: '/app/admin' },
    { label: 'Users', path: '/app/admin/users' },
    { label: 'Courses', path: '/app/admin/courses' },
    { label: 'Announcements', path: '/app/announcements' },
    { label: 'Profile', path: '/app/profile' },
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
    { label: 'Platform Health', value: '99.9%', meta: 'Normal operations' },
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
    name: 'Ada Student',
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

export const platformHighlights = [
  'Firebase Authentication for role-based sign in',
  'Firestore-ready collections for users, courses, assignments, and coding work',
  'Responsive dashboards for student, lecturer, and admin workflows',
  'CodeSpace module ready for Monaco and Judge0 or Piston integration',
]

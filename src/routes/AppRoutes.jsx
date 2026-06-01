import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { useAuth } from '../context/AuthContext'
import { HomePage } from '../pages/public/HomePage'
import { LoginPage } from '../pages/public/LoginPage'
import { RegisterPage } from '../pages/public/RegisterPage'
import { ForgotPasswordPage } from '../pages/public/ForgotPasswordPage'
import { StudentDashboardPage } from '../pages/student/StudentDashboardPage'
import { StudentCoursesPage } from '../pages/student/StudentCoursesPage'
import { CourseDetailPage } from '../pages/student/CourseDetailPage'
import { StudentAssignmentsPage } from '../pages/student/StudentAssignmentsPage'
import { CodeSpacePage } from '../pages/student/CodeSpacePage'
import { LecturerDashboardPage } from '../pages/lecturer/LecturerDashboardPage'
import { CourseManagementPage } from '../pages/lecturer/CourseManagementPage'
import { AssignmentManagementPage } from '../pages/lecturer/AssignmentManagementPage'
import { CodingProblemsPage } from '../pages/lecturer/CodingProblemsPage'
import { QuizManagementPage } from '../pages/lecturer/QuizManagementPage'
import { GradebookPage } from '../pages/lecturer/GradebookPage'
import { StudentProgressPage } from '../pages/lecturer/StudentProgressPage'
import { LecturerDiscussionsPage } from '../pages/lecturer/LecturerDiscussionsPage'
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage'
import { UserManagementPage } from '../pages/admin/UserManagementPage'
import { PlatformCoursesPage } from '../pages/admin/PlatformCoursesPage'
import { AdminStudentsPage } from '../pages/admin/AdminStudentsPage'
import { LecturerManagementPage } from '../pages/admin/LecturerManagementPage'
import { AdminCodeSpacePage } from '../pages/admin/AdminCodeSpacePage'
import { AdminAssignmentsPage } from '../pages/admin/AdminAssignmentsPage'
import { AdminQuizzesPage } from '../pages/admin/AdminQuizzesPage'
import { AdminReportsPage } from '../pages/admin/AdminReportsPage'
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage'
import { AnnouncementsPage } from '../pages/shared/AnnouncementsPage'
import { ProfilePage } from '../pages/shared/ProfilePage'
import { NotFoundPage } from '../pages/shared/NotFoundPage'
import { roleLandingPath } from '../utils/mockData'

function AppIndexRedirect() {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return <Navigate to={roleLandingPath[currentUser.role] || '/login'} replace />
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<AppIndexRedirect />} />

          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="student" element={<StudentDashboardPage />} />
            <Route path="student/courses" element={<StudentCoursesPage />} />
            <Route path="student/courses/:courseCode" element={<CourseDetailPage />} />
            <Route path="student/assignments" element={<StudentAssignmentsPage />} />
            <Route path="student/codespace" element={<CodeSpacePage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['lecturer']} />}>
            <Route path="lecturer" element={<LecturerDashboardPage />} />
            <Route path="lecturer/courses" element={<CourseManagementPage />} />
            <Route path="lecturer/assignments" element={<AssignmentManagementPage />} />
            <Route path="lecturer/problems" element={<CodingProblemsPage />} />
            <Route path="lecturer/quizzes" element={<QuizManagementPage />} />
            <Route path="lecturer/gradebook" element={<GradebookPage />} />
            <Route path="lecturer/progress" element={<StudentProgressPage />} />
            <Route path="lecturer/discussions" element={<LecturerDiscussionsPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="admin" element={<AdminDashboardPage />} />
            <Route path="admin/users" element={<UserManagementPage />} />
            <Route path="admin/courses" element={<PlatformCoursesPage />} />
            <Route path="admin/students" element={<AdminStudentsPage />} />
            <Route path="admin/lecturers" element={<LecturerManagementPage />} />
            <Route path="admin/codespace" element={<AdminCodeSpacePage />} />
            <Route path="admin/assignments" element={<AdminAssignmentsPage />} />
            <Route path="admin/quizzes" element={<AdminQuizzesPage />} />
            <Route path="admin/reports" element={<AdminReportsPage />} />
            <Route path="admin/settings" element={<AdminSettingsPage />} />
          </Route>

          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

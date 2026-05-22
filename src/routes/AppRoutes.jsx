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
import { StudentAssignmentsPage } from '../pages/student/StudentAssignmentsPage'
import { CodeSpacePage } from '../pages/student/CodeSpacePage'
import { LecturerDashboardPage } from '../pages/lecturer/LecturerDashboardPage'
import { CourseManagementPage } from '../pages/lecturer/CourseManagementPage'
import { AssignmentManagementPage } from '../pages/lecturer/AssignmentManagementPage'
import { CodingProblemsPage } from '../pages/lecturer/CodingProblemsPage'
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage'
import { UserManagementPage } from '../pages/admin/UserManagementPage'
import { PlatformCoursesPage } from '../pages/admin/PlatformCoursesPage'
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
            <Route path="student/assignments" element={<StudentAssignmentsPage />} />
            <Route path="student/codespace" element={<CodeSpacePage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['lecturer']} />}>
            <Route path="lecturer" element={<LecturerDashboardPage />} />
            <Route path="lecturer/courses" element={<CourseManagementPage />} />
            <Route path="lecturer/assignments" element={<AssignmentManagementPage />} />
            <Route path="lecturer/problems" element={<CodingProblemsPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="admin" element={<AdminDashboardPage />} />
            <Route path="admin/users" element={<UserManagementPage />} />
            <Route path="admin/courses" element={<PlatformCoursesPage />} />
          </Route>

          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

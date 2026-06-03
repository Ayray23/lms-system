import { AdminResourcePage } from './AdminResourcePage'
import { adminLecturers } from '../../utils/mockData'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'department', label: 'Department' },
  { key: 'courses', label: 'Courses Assigned' },
  { key: 'status', label: 'Status' },
]

const fields = [
  { name: 'name', label: 'Full name', placeholder: 'Dr. New Lecturer' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'lecturer@selms.dev' },
  {
    name: 'department',
    label: 'Department',
    defaultValue: 'Software Engineering',
    options: ['Software Engineering', 'Computer Science', 'Information Systems', 'IT Management'],
  },
  { name: 'courses', label: 'Courses assigned', defaultValue: '0' },
  { name: 'status', label: 'Status', defaultValue: 'Active', options: ['Active', 'Pending', 'Inactive'] },
]

export function LecturerManagementPage() {
  return (
    <AdminResourcePage
      title="Lecturer Management"
      description="Manage lecturers, assign courses, and review teaching assignments."
      actionLabel="Add lecturer"
      columns={columns}
      rows={adminLecturers}
      fields={fields}
      createRecord={(form) => form}
    />
  )
}

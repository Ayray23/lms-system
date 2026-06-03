import { AdminResourcePage } from './AdminResourcePage'
import { courseManagementRows } from '../../utils/mockData'

const columns = [
  { key: 'course', label: 'Course' },
  { key: 'owner', label: 'Assigned Lecturer' },
  { key: 'materials', label: 'Materials' },
  { key: 'students', label: 'Enrollment' },
]

const fields = [
  { name: 'courseCode', label: 'Course code', placeholder: 'SEN 409' },
  { name: 'courseTitle', label: 'Course title', placeholder: 'Software Project Management' },
  { name: 'owner', label: 'Assigned lecturer', placeholder: 'Dr. Musa Lecturer' },
  { name: 'students', label: 'Expected enrollment', defaultValue: '0' },
]

export function PlatformCoursesPage() {
  return (
    <AdminResourcePage
      title="Course Management"
      description="Assign lecturers, review catalogue coverage, and monitor course content."
      actionLabel="Create course"
      columns={columns}
      rows={courseManagementRows}
      fields={fields}
      createRecord={(form) => ({
        course: `${form.courseCode} - ${form.courseTitle}`,
        owner: form.owner,
        materials: '0 files',
        students: form.students,
      })}
    />
  )
}

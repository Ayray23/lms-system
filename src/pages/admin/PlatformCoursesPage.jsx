import { DataTable } from '../../components/DataTable'
import { SectionCard } from '../../components/SectionCard'
import { courseManagementRows } from '../../utils/mockData'

const columns = [
  { key: 'course', label: 'Course' },
  { key: 'owner', label: 'Assigned Lecturer' },
  { key: 'materials', label: 'Materials' },
  { key: 'students', label: 'Enrollment' },
]

export function PlatformCoursesPage() {
  return (
    <div className="page-stack">
      <SectionCard
        title="Course Management"
        description="Assign lecturers, review catalogue coverage, and monitor course content."
        action={<button className="primary-button small">Create course</button>}
      >
        <DataTable columns={columns} rows={courseManagementRows} />
      </SectionCard>
    </div>
  )
}

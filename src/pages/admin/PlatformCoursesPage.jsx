import { useCallback } from 'react'
import { AdminResourcePage } from './AdminResourcePage'
import { courseService } from '../../firebase/services'

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
  const loadCourses = useCallback(async () => {
    const courses = await courseService.listCourses()
    return courses.map((course) => ({
      id: course.id,
      course: `${course.code} - ${course.title}`,
      owner: course.lecturer || 'Unassigned',
      materials: course.materials ? `${course.materials} files` : '0 files',
      students: String(course.students || 0),
    }))
  }, [])

  return (
    <AdminResourcePage
      title="Course Management"
      description="Assign lecturers, review catalogue coverage, and monitor course content."
      actionLabel="Create course"
      columns={columns}
      rows={[]}
      loadRecords={loadCourses}
      fields={fields}
      createRecord={async (form) => {
        const savedCourse = await courseService.createCourse({
          code: form.courseCode,
          title: form.courseTitle,
          lecturer: form.owner,
          students: Number(form.students),
          status: 'Active',
          summary: '',
          department: 'Software Engineering',
          format: 'Lecture',
          lessons: 0,
        })

        return {
          id: savedCourse.id,
          course: `${savedCourse.code} - ${savedCourse.title}`,
          owner: savedCourse.lecturer,
          materials: '0 files',
          students: String(savedCourse.students || 0),
        }
      }}
    />
  )
}

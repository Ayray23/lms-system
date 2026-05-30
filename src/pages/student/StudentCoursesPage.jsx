import { useMemo, useState } from 'react'
import { Modal } from '../../components/Modal'
import { SectionCard } from '../../components/SectionCard'
import { studentCourses } from '../../utils/mockData'

export function StudentCoursesPage() {
  const [search, setSearch] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [levelFilter, setLevelFilter] = useState('all')
  const [selectedCourse, setSelectedCourse] = useState(studentCourses[0])
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [showCourseModal, setShowCourseModal] = useState(false)
  const [showOutlineModal, setShowOutlineModal] = useState(false)
  const [enrollMessage, setEnrollMessage] = useState('')

  const filteredCourses = useMemo(() => {
    return studentCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.code.toLowerCase().includes(search.toLowerCase())
      const matchesDepartment = departmentFilter === 'all' || course.department.toLowerCase().includes(departmentFilter)
      const matchesLevel = levelFilter === 'all' || course.level === levelFilter
      return matchesSearch && matchesDepartment && matchesLevel
    })
  }, [search, departmentFilter, levelFilter])

  const openCourseModal = (course) => {
    setSelectedCourse(course)
    setEnrollMessage('')
    setShowCourseModal(true)
  }

  const openOutlineModal = (course) => {
    setSelectedCourse(course)
    setShowOutlineModal(true)
  }

  const confirmEnroll = () => {
    setEnrolledCourses((prev) => {
      if (prev.includes(selectedCourse.code)) return prev
      return [...prev, selectedCourse.code]
    })
    setEnrollMessage(`You are now enrolled in ${selectedCourse.code}.`)
  }

  return (
    <div className="page-stack">
      <section className="catalogue-hero">
        <div className="catalogue-hero-copy">
          <p className="eyebrow">Course Catalogue</p>
          <h2>Find the right courses for your level, department, and current learning goals.</h2>
          <p>
            Explore core software engineering subjects, compare delivery formats,
            and jump into the courses shaping this semester.
          </p>
        </div>

        <article className="featured-course-panel">
          <div className="featured-course-top">
            <span className="featured-label">Featured This Week</span>
            <span className="course-badge">{studentCourses[0].code}</span>
          </div>
          <h3>{studentCourses[0].title}</h3>
          <p>{studentCourses[0].summary}</p>
          <div className="featured-course-meta">
            <span>{studentCourses[0].lecturer}</span>
            <span>{studentCourses[0].credits}</span>
            <span>{studentCourses[0].lessons} lessons</span>
          </div>
        </article>
      </section>

      <SectionCard
        title="Browse Courses"
        description="Search, filter, and compare course offerings before enrollment."
        action={
          <button className="primary-button small" type="button" onClick={() => openCourseModal(studentCourses[0])}>
            Enroll in course
          </button>
        }
      >
        <div className="catalogue-toolbar">
          <label className="catalogue-search">
            <span>Search course title or code</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Try SEN 301 or Web Engineering"
            />
          </label>

          <div className="catalogue-filters">
            <label>
              <span>Department</span>
              <select value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)}>
                <option value="all">All Departments</option>
                <option value="software engineering">Software Engineering</option>
                <option value="computer science">Computer Science</option>
              </select>
            </label>

            <label>
              <span>Level</span>
              <select value={levelFilter} onChange={(event) => setLevelFilter(event.target.value)}>
                <option value="all">All Levels</option>
                <option value="300">300 Level</option>
                <option value="400">400 Level</option>
              </select>
            </label>
          </div>
        </div>

        <div className="catalogue-results">
          <div className="catalogue-summary-strip">
            <div>
              <strong>{filteredCourses.length} courses available</strong>
              <p>Balanced across software engineering theory, systems, and practical labs.</p>
            </div>
            <div className="catalogue-pills">
              <span>Core Courses</span>
              <span>Coding Enabled</span>
              <span>Semester Active</span>
            </div>
          </div>

          <div className="catalogue-grid">
            {filteredCourses.map((course) => (
              <article key={course.code} className="catalogue-card">
                <div className="catalogue-card-head">
                  <span className="course-badge">{course.code}</span>
                  <span className={`catalogue-status status-${course.status.toLowerCase()}`}>
                    {course.status}
                  </span>
                </div>
                <h3>{course.title}</h3>
                <p className="catalogue-summary">{course.summary}</p>

                <div className="catalogue-metrics">
                  <article>
                    <span>Lecturer</span>
                    <strong>{course.lecturer}</strong>
                  </article>
                  <article>
                    <span>Format</span>
                    <strong>{course.format}</strong>
                  </article>
                  <article>
                    <span>Lessons</span>
                    <strong>{course.lessons}</strong>
                  </article>
                  <article>
                    <span>Credits</span>
                    <strong>{course.credits}</strong>
                  </article>
                </div>

                <div className="chip-row">
                  <span>{course.department}</span>
                  <span>{course.level}</span>
                </div>

                <div className="catalogue-card-footer">
                  <button
                    className="ghost-button small"
                    type="button"
                    onClick={() => openOutlineModal(course)}
                  >
                    View outline
                  </button>
                  <button
                    className="primary-button small"
                    type="button"
                    onClick={() => openCourseModal(course)}
                  >
                    Enroll now
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionCard>

      <Modal
        open={showCourseModal}
        title={`Enroll in ${selectedCourse?.code}`}
        onClose={() => setShowCourseModal(false)}
        footer={
          <button className="primary-button" type="button" onClick={confirmEnroll}>
            Confirm enrollment
          </button>
        }
      >
        <p className="text-slate-300">{selectedCourse?.title}</p>
        <div className="catalogue-metrics">
          <article>
            <span>Lecturer</span>
            <strong>{selectedCourse?.lecturer}</strong>
          </article>
          <article>
            <span>Format</span>
            <strong>{selectedCourse?.format}</strong>
          </article>
          <article>
            <span>Lessons</span>
            <strong>{selectedCourse?.lessons}</strong>
          </article>
        </div>
        {enrollMessage ? (
          <div className="rounded-3xl bg-emerald-500/10 p-4 text-sm text-emerald-200">
            {enrollMessage}
          </div>
        ) : (
          <p className="text-slate-400">
            Review the course details and confirm your enrollment. You can always withdraw from this course later in your profile.
          </p>
        )}
      </Modal>

      <Modal
        open={showOutlineModal}
        title={`Course outline — ${selectedCourse?.code}`}
        onClose={() => setShowOutlineModal(false)}
      >
        <p className="text-slate-300">{selectedCourse?.title}</p>
        <div className="grid gap-3">
          <p className="text-slate-400">{selectedCourse?.summary}</p>
          <div className="rounded-3xl bg-slate-950/80 p-4 text-sm text-slate-300">
            <strong>Week-by-week overview</strong>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-400">
              <li>Foundations and architecture concepts</li>
              <li>Practical labs and code reviews</li>
              <li>Integrated assessment and teamwork</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  )
}

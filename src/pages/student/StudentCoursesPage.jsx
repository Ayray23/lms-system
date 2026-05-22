import { SectionCard } from '../../components/SectionCard'
import { studentCourses } from '../../utils/mockData'

export function StudentCoursesPage() {
  const featuredCourse = studentCourses[0]

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
            <span className="course-badge">{featuredCourse.code}</span>
          </div>
          <h3>{featuredCourse.title}</h3>
          <p>{featuredCourse.summary}</p>
          <div className="featured-course-meta">
            <span>{featuredCourse.lecturer}</span>
            <span>{featuredCourse.credits}</span>
            <span>{featuredCourse.lessons} lessons</span>
          </div>
        </article>
      </section>

      <SectionCard
        title="Browse Courses"
        description="Search, filter, and compare course offerings before enrollment."
        action={<button className="primary-button small">Enroll in course</button>}
      >
        <div className="catalogue-toolbar">
          <label className="catalogue-search">
            <span>Search course title or code</span>
            <input type="search" placeholder="Try SEN 301 or Web Engineering" />
          </label>

          <div className="catalogue-filters">
            <label>
              <span>Department</span>
              <select defaultValue="all">
                <option value="all">All Departments</option>
                <option value="software-engineering">Software Engineering</option>
                <option value="computer-science">Computer Science</option>
              </select>
            </label>

            <label>
              <span>Level</span>
              <select defaultValue="300">
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
              <strong>{studentCourses.length} courses available</strong>
              <p>Balanced across software engineering theory, systems, and practical labs.</p>
            </div>
            <div className="catalogue-pills">
              <span>Core Courses</span>
              <span>Coding Enabled</span>
              <span>Semester Active</span>
            </div>
          </div>

          <div className="catalogue-grid">
            {studentCourses.map((course) => (
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
                  <button className="ghost-button small" type="button">
                    View outline
                  </button>
                  <button className="primary-button small" type="button">
                    Enroll now
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  )
}

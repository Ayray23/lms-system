import { SectionCard } from '../../components/SectionCard'
import { StatCard } from '../../components/StatCard'
import { assignments, courseManagementRows, dashboardStats } from '../../utils/mockData'

export function LecturerDashboardPage() {
  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Lecturer Dashboard</p>
          <h2>Manage courses, materials, grading, and coding exercises efficiently.</h2>
        </div>
      </section>

      <section className="stats-grid">
        {dashboardStats.lecturer.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </section>

      <section className="two-column-grid">
        <SectionCard title="Course Analytics" description="Quick summary of active teaching load">
          <div className="stack-list">
            {courseManagementRows.map((course) => (
              <article key={course.course} className="feed-item">
                <div>
                  <strong>{course.course}</strong>
                  <p>{course.materials}</p>
                </div>
                <span>{course.students} students</span>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Submission Queue" description="Assignments waiting for grading">
          <div className="stack-list">
            {assignments.map((assignment) => (
              <article key={assignment.title} className="feed-item">
                <div>
                  <strong>{assignment.title}</strong>
                  <p>{assignment.course}</p>
                </div>
                <span>{assignment.status}</span>
              </article>
            ))}
          </div>
        </SectionCard>
      </section>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import { SectionCard } from '../../components/SectionCard'
import { StatCard } from '../../components/StatCard'
import { announcements, assignments, dashboardStats, studentCourses } from '../../utils/mockData'

export function StudentDashboardPage() {
  const navigate = useNavigate()

  return (
    <div className="page-stack p-6">
      <section className="page-hero">
        <div className='p-4'>
          <p className="eyebrow">Student Dashboard</p>
          <h2>Track coursework, deadlines, and coding practice from one place.</h2>
        </div>
      </section>

      <section className="stats-grid">
        {dashboardStats.student.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </section>

      <section className="two-column-grid">
        <SectionCard
          title="My Courses"
          description="Your current semester enrollment"
          action={
            <button className="ghost-button small" type="button" onClick={() => navigate('/app/student/courses')}>
              View courses
            </button>
          }
        >
          <div className="list-grid">
            {studentCourses.map((course) => (
              <article key={course.code} className="list-item-card">
                <strong>{course.code}</strong>
                <h3>{course.title}</h3>
                <p>{course.lecturer}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recent Announcements" description="Latest class updates">
          <div className="stack-list">
            {announcements.map((item) => (
              <article key={item.title} className="feed-item">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.audience}</p>
                </div>
                <span>{item.time}</span>
              </article>
            ))}
          </div>
        </SectionCard>
      </section>

      <SectionCard
        title="Assignments Overview"
        description="Stay ahead of pending work"
        action={
          <button className="ghost-button small" type="button" onClick={() => navigate('/app/student/assignments')}>
            Review assignments
          </button>
        }
      >
        <div className="stack-list">
          {assignments.map((item) => (
            <article key={item.title} className="feed-item">
              <div>
                <strong>{item.title}</strong>
                <p>{item.course}</p>
              </div>
              <span>{item.deadline}</span>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

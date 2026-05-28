import { SectionCard } from '../../components/SectionCard'
import { StatCard } from '../../components/StatCard'
import { announcements, dashboardStats, usersTable } from '../../utils/mockData'

export function AdminDashboardPage() {
  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Admin Dashboard</p>
          <h2>Monitor users, courses, and platform-wide academic operations.</h2>
        </div>
      </section>

      <section className="stats-grid">
        {dashboardStats.admin.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </section>

      <section className="two-column-grid">
        <SectionCard title="Platform Activity" description="Recent operational signals">
          <div className="stack-list p-12">
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

        <SectionCard title="User Snapshot" description="Key accounts on the platform">
          <div className="stack-list">
            {usersTable.map((user) => (
              <article key={user.name} className="feed-item">
                <div>
                  <strong>{user.name}</strong>
                  <p>{user.department}</p>
                </div>
                <span>{user.role}</span>
              </article>
            ))}
          </div>
        </SectionCard>
      </section>
    </div>
  )
}

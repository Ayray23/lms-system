import { SectionCard } from '../../components/SectionCard'
import { announcements } from '../../utils/mockData'

export function AnnouncementsPage() {
  return (
    <div className="page-stack">
      <SectionCard
        title="Announcements"
        description="Lecturer updates, class notices, and academic reminders."
        action={<button className="primary-button small">Post announcement</button>}
      >
        <div className="stack-list">
          {announcements.map((item) => (
            <article key={item.title} className="feed-item align-start">
              <div>
                <strong>{item.title}</strong>
                <p>{item.audience}</p>
              </div>
              <span>{item.time}</span>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

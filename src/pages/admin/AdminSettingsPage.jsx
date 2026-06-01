import { SectionCard } from '../../components/SectionCard'

export function AdminSettingsPage() {
  return (
    <div className="page-stack">
      <SectionCard
        title="Platform Settings"
        description="Manage institution branding, academic session settings, and security controls."
      >
        <div className="stack-list">
          <article className="feed-item align-start">
            <div>
              <strong>Institution Name</strong>
              <p>SE-LMS Academy</p>
            </div>
            <span>General</span>
          </article>
          <article className="feed-item align-start">
            <div>
              <strong>Email Settings</strong>
              <p>smtp@selms.dev</p>
            </div>
            <span>Notifications</span>
          </article>
          <article className="feed-item align-start">
            <div>
              <strong>Academic Session</strong>
              <p>2025/2026 - Second Semester</p>
            </div>
            <span>Scheduling</span>
          </article>
          <article className="feed-item align-start">
            <div>
              <strong>Security Policies</strong>
              <p>Two-factor authentication enabled for admin accounts.</p>
            </div>
            <span>Security</span>
          </article>
        </div>
      </SectionCard>
    </div>
  )
}

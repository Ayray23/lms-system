import { SectionCard } from '../../components/SectionCard'
import { useAuth } from '../../context/AuthContext'

export function ProfilePage() {
  const { currentUser, isFirebaseConfigured } = useAuth()

  return (
    <div className="page-stack">
      <SectionCard title="Profile" description="Your SE-LMS account information">
        <div className="profile-grid">
          <article className="profile-panel">
            <span className="profile-label">Full name</span>
            <strong>{currentUser?.name}</strong>
          </article>
          <article className="profile-panel">
            <span className="profile-label">Email</span>
            <strong>{currentUser?.email}</strong>
          </article>
          <article className="profile-panel">
            <span className="profile-label">Role</span>
            <strong>{currentUser?.role}</strong>
          </article>
          <article className="profile-panel">
            <span className="profile-label">Department</span>
            <strong>{currentUser?.department}</strong>
          </article>
        </div>
        <div className="info-banner spaced">
          {isFirebaseConfigured
            ? 'Firebase is connected. Next step: persist profile records in Firestore.'
            : 'Demo mode is active. Add Firebase environment variables to enable live auth.'}
        </div>
      </SectionCard>
    </div>
  )
}

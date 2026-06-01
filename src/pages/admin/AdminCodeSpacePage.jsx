import { DataTable } from '../../components/DataTable'
import { SectionCard } from '../../components/SectionCard'
import { adminCodingChallenges } from '../../utils/mockData'

const columns = [
  { key: 'challenge', label: 'Challenge' },
  { key: 'language', label: 'Language' },
  { key: 'deadline', label: 'Deadline' },
  { key: 'status', label: 'Status' },
]

export function AdminCodeSpacePage() {
  return (
    <div className="page-stack">
      <SectionCard
        title="CodeSpace Management"
        description="Create challenges, set deadlines, and review coding submissions."
        action={<button className="primary-button small">New Challenge</button>}
      >
        <DataTable columns={columns} rows={adminCodingChallenges} />
      </SectionCard>
    </div>
  )
}

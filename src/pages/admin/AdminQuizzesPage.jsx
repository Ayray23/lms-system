import { DataTable } from '../../components/DataTable'
import { SectionCard } from '../../components/SectionCard'
import { adminQuizData } from '../../utils/mockData'

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'type', label: 'Type' },
  { key: 'timeLimit', label: 'Time Limit' },
  { key: 'status', label: 'Status' },
]

export function AdminQuizzesPage() {
  return (
    <div className="page-stack">
      <SectionCard
        title="Quiz Management"
        description="Build quizzes, add questions, and configure auto-grading settings."
        action={<button className="primary-button small">Create Quiz</button>}
      >
        <DataTable columns={columns} rows={adminQuizData} />
      </SectionCard>
    </div>
  )
}

import { DataTable } from '../../components/DataTable'
import { SectionCard } from '../../components/SectionCard'
import { codingProblems } from '../../utils/mockData'

const columns = [
  { key: 'title', label: 'Problem' },
  { key: 'language', label: 'Language' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'topic', label: 'Topic' },
]

export function CodingProblemsPage() {
  return (
    <div className="page-stack">
      <SectionCard
        title="Coding Problem Management"
        description="Define coding tasks, starter code, instructions, and language targets."
        action={<button className="primary-button small">Create coding task</button>}
      >
        <DataTable columns={columns} rows={codingProblems} />
      </SectionCard>
    </div>
  )
}

import { useState } from 'react'
import { Modal } from '../../components/Modal'
import { DataTable } from '../../components/DataTable'
import { SectionCard } from '../../components/SectionCard'
import { assignments } from '../../utils/mockData'

const columns = [
  { key: 'title', label: 'Assignment' },
  { key: 'course', label: 'Course' },
  { key: 'deadline', label: 'Deadline' },
  { key: 'status', label: 'Status' },
]

export function StudentAssignmentsPage() {
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(assignments[0])
  const [submissionNotes, setSubmissionNotes] = useState('')
  const [submissionStatus, setSubmissionStatus] = useState('')

  const openSubmitModal = () => {
    setSelectedAssignment(assignments[0])
    setSubmissionNotes('')
    setSubmissionStatus('')
    setShowSubmitModal(true)
  }

  const handleSubmit = () => {
    setSubmissionStatus(`Assignment "${selectedAssignment.title}" submitted successfully.`)
    setSubmissionNotes('')
  }

  return (
    <div className="page-stack">
      <SectionCard
        title="Assignments"
        description="Document tasks, coding submissions, and grading updates."
        action={
          <button className="primary-button small" type="button" onClick={openSubmitModal}>
            Submit assignment
          </button>
        }
      >
        <DataTable columns={columns} rows={assignments} />
      </SectionCard>

      <Modal
        open={showSubmitModal}
        title="Submit Assignment"
        onClose={() => setShowSubmitModal(false)}
        footer={
          <button className="primary-button" type="button" onClick={handleSubmit}>
            Upload submission
          </button>
        }
      >
        <label>
          <span>Select assignment</span>
          <select
            value={selectedAssignment.title}
            onChange={(event) =>
              setSelectedAssignment(
                assignments.find((assignment) => assignment.title === event.target.value) || assignments[0]
              )
            }
          >
            {assignments.map((assignment) => (
              <option key={assignment.title} value={assignment.title}>
                {assignment.title}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Submission notes</span>
          <textarea
            className="code-editor"
            rows={5}
            value={submissionNotes}
            onChange={(event) => setSubmissionNotes(event.target.value)}
            placeholder="Share any notes, file details, or code entry information."
          />
        </label>

        {submissionStatus && (
          <div className="rounded-3xl bg-emerald-500/10 p-4 text-sm text-emerald-200">
            {submissionStatus}
          </div>
        )}
      </Modal>
    </div>
  )
}

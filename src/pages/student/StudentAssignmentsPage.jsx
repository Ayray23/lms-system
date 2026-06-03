import { useEffect, useState } from 'react'
import { Modal } from '../../components/Modal'
import { DataTable } from '../../components/DataTable'
import { SectionCard } from '../../components/SectionCard'
import { useAuth } from '../../context/AuthContext'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import { assignmentService, submissionService } from '../../firebase/services'

const columns = [
  { key: 'title', label: 'Assignment' },
  { key: 'course', label: 'Course' },
  { key: 'deadline', label: 'Deadline' },
  { key: 'status', label: 'Status' },
]

export function StudentAssignmentsPage() {
  const { currentUser } = useAuth()
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [submissionNotes, setSubmissionNotes] = useState('')
  const [submissionStatus, setSubmissionStatus] = useState('')

  const {
    records: assignments,
    loading,
    error,
    refresh,
  } = useFirestoreCollection(assignmentService.listAssignments)

  useEffect(() => {
    if (!selectedAssignment && assignments.length > 0) {
      setSelectedAssignment(assignments[0])
    }
  }, [assignments, selectedAssignment])

  const openSubmitModal = () => {
    setSelectedAssignment(assignments[0] || null)
    setSubmissionNotes('')
    setSubmissionStatus('')
    setShowSubmitModal(true)
  }

  const handleSubmit = async () => {
    if (!selectedAssignment || !currentUser) {
      setSubmissionStatus('Unable to submit assignment at this time.')
      return
    }

    await submissionService.createSubmission({
      studentId: currentUser.uid,
      assignmentId: selectedAssignment.id,
      notes: submissionNotes,
      status: 'Submitted',
    })

    setSubmissionStatus(`Assignment "${selectedAssignment.title}" submitted successfully.`)
    setSubmissionNotes('')
    await refresh()
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

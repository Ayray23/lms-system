import { useState } from 'react'
import { DataTable } from '../../components/DataTable'
import { Modal } from '../../components/Modal'
import { SectionCard } from '../../components/SectionCard'
import { lecturerAssignments, lecturerCourses, submissionQueue } from '../../utils/mockData'

const assignmentColumns = [
  { key: 'title', label: 'Assignment' },
  { key: 'course', label: 'Course' },
  { key: 'deadline', label: 'Deadline' },
  { key: 'submissions', label: 'Submissions' },
  { key: 'grading', label: 'Grading' },
  { key: 'status', label: 'Status' },
]

const submissionColumns = [
  { key: 'student', label: 'Student' },
  { key: 'item', label: 'Submission' },
  { key: 'course', label: 'Course' },
  { key: 'submitted', label: 'Submitted' },
  { key: 'score', label: 'Score' },
]

export function AssignmentManagementPage() {
  const [assignments, setAssignments] = useState(lecturerAssignments)
  const [showAssignmentModal, setShowAssignmentModal] = useState(false)
  const [form, setForm] = useState({
    title: '',
    course: lecturerCourses[0].code,
    deadline: '',
    instructions: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateAssignment = () => {
    if (!form.title.trim() || !form.deadline) return

    setAssignments((prev) => [
      {
        title: form.title.trim(),
        course: form.course,
        deadline: form.deadline,
        submissions: '0 / 0',
        grading: 'Not started',
        status: 'Draft',
      },
      ...prev,
    ])
    setForm((prev) => ({ ...prev, title: '', deadline: '', instructions: '' }))
    setShowAssignmentModal(false)
  }

  return (
    <div className="page-stack">
      <SectionCard
        title="Assignment Studio"
        description="Create assignments, define instructions, set deadlines, and track grading."
        action={
          <button className="primary-button small" type="button" onClick={() => setShowAssignmentModal(true)}>
            New assignment
          </button>
        }
      >
        <DataTable columns={assignmentColumns} rows={assignments} />
      </SectionCard>

      <section className="two-column-grid">
        <SectionCard title="Submission Review Queue" description="Work waiting for lecturer marks and feedback">
          <DataTable columns={submissionColumns} rows={submissionQueue} />
        </SectionCard>

        <SectionCard title="Grading Workflow" description="Professional grading steps before marks are approved">
          <div className="lecturer-timeline">
            <span>Open submission</span>
            <span>Check rubric</span>
            <span>Add score and feedback</span>
            <span>Approve marks</span>
          </div>
        </SectionCard>
      </section>

      <Modal
        open={showAssignmentModal}
        title="Create Assignment"
        onClose={() => setShowAssignmentModal(false)}
        footer={
          <button className="primary-button" type="button" onClick={handleCreateAssignment}>
            Save assignment
          </button>
        }
      >
        <label>
          <span>Assignment title</span>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Design a Use Case Diagram"
          />
        </label>
        <div className="form-grid">
          <label>
            <span>Course</span>
            <select name="course" value={form.course} onChange={handleChange}>
              {lecturerCourses.map((course) => (
                <option key={course.code} value={course.code}>
                  {course.code} - {course.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Due date</span>
            <input name="deadline" type="date" value={form.deadline} onChange={handleChange} />
          </label>
        </div>
        <label>
          <span>Instructions</span>
          <textarea
            className="code-editor"
            rows={5}
            name="instructions"
            value={form.instructions}
            onChange={handleChange}
            placeholder="Explain the expected deliverables, format, and grading criteria."
          />
        </label>
      </Modal>
    </div>
  )
}

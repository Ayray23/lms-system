import { useState } from 'react'
import { DataTable } from '../../components/DataTable'
import { Modal } from '../../components/Modal'
import { SectionCard } from '../../components/SectionCard'
import { courseContentItems, lecturerCourses } from '../../utils/mockData'

const columns = [
  { key: 'course', label: 'Course' },
  { key: 'title', label: 'Material' },
  { key: 'type', label: 'Type' },
  { key: 'format', label: 'Format' },
  { key: 'visibility', label: 'Visibility' },
  { key: 'updated', label: 'Updated' },
]

export function CourseManagementPage() {
  const [materials, setMaterials] = useState(courseContentItems)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [form, setForm] = useState({
    course: lecturerCourses[0].code,
    title: '',
    type: 'Lecture Notes',
    format: 'PDF',
    visibility: 'Draft',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddMaterial = () => {
    if (!form.title.trim()) return

    setMaterials((prev) => [
      {
        ...form,
        title: form.title.trim(),
        updated: 'Just now',
      },
      ...prev,
    ])
    setForm((prev) => ({ ...prev, title: '', visibility: 'Draft' }))
    setShowUploadModal(false)
  }

  return (
    <div className="page-stack">
      <section className="lecturer-course-grid">
        {lecturerCourses.map((course) => (
          <article key={course.code} className="lecturer-course-card">
            <div>
              <span className="course-badge">{course.code}</span>
              <h3>{course.title}</h3>
              <p>{course.students} students enrolled</p>
            </div>
            <div className="lecturer-metric-row">
              <span>{course.completion} progress</span>
              <span>{course.contentHealth}</span>
            </div>
          </article>
        ))}
      </section>

      <SectionCard
        title="Course Content Library"
        description="Upload notes, PDFs, slides, videos, and external resources for assigned courses."
        action={
          <button className="primary-button small" type="button" onClick={() => setShowUploadModal(true)}>
            Upload material
          </button>
        }
      >
        <DataTable columns={columns} rows={materials} />
      </SectionCard>

      <SectionCard title="Publishing Checklist" description="Keep every course ready before class">
        <div className="lecturer-checklist">
          <span>Weekly notes uploaded</span>
          <span>Slides attached</span>
          <span>Video resources reviewed</span>
          <span>External links verified</span>
        </div>
      </SectionCard>

      <Modal
        open={showUploadModal}
        title="Upload Course Material"
        onClose={() => setShowUploadModal(false)}
        footer={
          <button className="primary-button" type="button" onClick={handleAddMaterial}>
            Add material
          </button>
        }
      >
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
          <span>Material title</span>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Week 3 UML Diagrams"
          />
        </label>
        <div className="form-grid">
          <label>
            <span>Type</span>
            <select name="type" value={form.type} onChange={handleChange}>
              <option>Lecture Notes</option>
              <option>Slides</option>
              <option>Video</option>
              <option>External Resource</option>
              <option>Reading</option>
            </select>
          </label>
          <label>
            <span>Format</span>
            <select name="format" value={form.format} onChange={handleChange}>
              <option>PDF</option>
              <option>PPTX</option>
              <option>MP4</option>
              <option>Link</option>
              <option>DOCX</option>
            </select>
          </label>
        </div>
        <label>
          <span>Visibility</span>
          <select name="visibility" value={form.visibility} onChange={handleChange}>
            <option>Draft</option>
            <option>Published</option>
            <option>Scheduled</option>
          </select>
        </label>
      </Modal>
    </div>
  )
}

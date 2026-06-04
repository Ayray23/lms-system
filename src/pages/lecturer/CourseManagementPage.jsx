import { useCallback, useEffect, useMemo, useState } from 'react'
import { DataTable } from '../../components/DataTable'
import { Modal } from '../../components/Modal'
import { SectionCard } from '../../components/SectionCard'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import { courseService, materialService } from '../../firebase/services'

const columns = [
  { key: 'courseCode', label: 'Course' },
  { key: 'title', label: 'Material' },
  { key: 'type', label: 'Type' },
  { key: 'format', label: 'Format' },
  { key: 'visibility', label: 'Visibility' },
  { key: 'updatedAt', label: 'Updated' },
]

export function CourseManagementPage() {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [form, setForm] = useState({
    courseId: '',
    title: '',
    type: 'Lecture Notes',
    format: 'PDF',
    visibility: 'Draft',
  })
  const [saveError, setSaveError] = useState('')

  const {
    records: courses,
    loading: coursesLoading,
  } = useFirestoreCollection(courseService.listCourses)

  useEffect(() => {
    if (!form.courseId && courses.length) {
      setForm((prev) => ({ ...prev, courseId: courses[0].id }))
    }
  }, [courses, form.courseId])

  const selectedCourse = useMemo(
    () => courses.find((course) => course.id === form.courseId) || null,
    [courses, form.courseId]
  )

  const {
    records: materials,
    loading: materialsLoading,
    refresh: refreshMaterials,
  } = useFirestoreCollection(
    useCallback(async () => {
      if (!form.courseId) return []
      return materialService.listCourseMaterials(form.courseId)
    }, [form.courseId]),
    [form.courseId]
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddMaterial = async () => {
    if (!form.title.trim() || !form.courseId) return

    setSaveError('')
    try {
      await materialService.createMaterial({
        courseId: form.courseId,
        courseCode: selectedCourse?.code || '',
        title: form.title.trim(),
        type: form.type,
        format: form.format,
        visibility: form.visibility,
        updatedAt: new Date().toISOString(),
      })

      setForm((prev) => ({ ...prev, title: '', visibility: 'Draft' }))
      setShowUploadModal(false)
      await refreshMaterials()
    } catch (error) {
      console.error('Failed to save course material:', error)
      setSaveError('Unable to save material to Firestore. Check console for details.')
    }
  }

  return (
    <div className="page-stack">
      <section className="lecturer-course-grid">
        {courses.length ? (
          courses.map((course) => (
            <article key={course.id} className="lecturer-course-card">
              <div>
                <span className="course-badge">{course.code}</span>
                <h3>{course.title}</h3>
                <p>{course.students || 'No enrollment data yet'} students enrolled</p>
              </div>
              <div className="lecturer-metric-row">
                <span>{course.completion || 'No progress data'}</span>
                <span>{course.contentHealth || 'Content status unavailable'}</span>
              </div>
            </article>
          ))
        ) : (
          <div className="text-slate-400">Loading courses or no assigned courses available.</div>
        )}
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
        <DataTable columns={columns} rows={materials} loading={materialsLoading} />
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
          <select name="courseId" value={form.courseId} onChange={handleChange}>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
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
        {saveError && <p className="mt-4 text-sm text-rose-300">{saveError}</p>}
      </Modal>
    </div>
  )
}

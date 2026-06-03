import { useState } from 'react'
import { Modal } from '../../components/Modal'
import { SectionCard } from '../../components/SectionCard'
import { announcements } from '../../utils/mockData'

export function AnnouncementsPage() {
  const [items, setItems] = useState(announcements)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    title: '',
    audience: 'Entire course',
    time: 'Just now',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handlePost = () => {
    if (!form.title.trim()) return

    setItems((prev) => [{ ...form, title: form.title.trim() }, ...prev])
    setForm({ title: '', audience: 'Entire course', time: 'Just now' })
    setShowModal(false)
  }

  return (
    <div className="page-stack">
      <SectionCard
        title="Announcements"
        description="Lecturer updates, class notices, and academic reminders."
        action={
          <button className="primary-button small" type="button" onClick={() => setShowModal(true)}>
            Post announcement
          </button>
        }
      >
        <div className="stack-list">
          {items.map((item) => (
            <article key={`${item.title}-${item.time}`} className="feed-item align-start">
              <div>
                <strong>{item.title}</strong>
                <p>{item.audience}</p>
              </div>
              <span>{item.time}</span>
            </article>
          ))}
        </div>
      </SectionCard>

      <Modal
        open={showModal}
        title="Post Announcement"
        onClose={() => setShowModal(false)}
        footer={
          <button className="primary-button" type="button" onClick={handlePost}>
            Publish announcement
          </button>
        }
      >
        <label>
          <span>Announcement</span>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Tomorrow's class starts at 9:00 AM"
          />
        </label>
        <label>
          <span>Audience</span>
          <select name="audience" value={form.audience} onChange={handleChange}>
            <option>Entire course</option>
            <option>Selected students</option>
            <option>All lecturers</option>
            <option>All students</option>
          </select>
        </label>
      </Modal>
    </div>
  )
}

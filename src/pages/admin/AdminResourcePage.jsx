import { useState } from 'react'
import { DataTable } from '../../components/DataTable'
import { Modal } from '../../components/Modal'
import { SectionCard } from '../../components/SectionCard'

function getInitialForm(fields) {
  return Object.fromEntries(fields.map((field) => [field.name, field.defaultValue || '']))
}

export function AdminResourcePage({
  title,
  description,
  actionLabel,
  columns,
  rows,
  fields,
  createRecord,
  children,
}) {
  const [items, setItems] = useState(rows)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(() => getInitialForm(fields))

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreate = () => {
    const primaryField = fields[0]?.name
    if (primaryField && !form[primaryField]?.trim()) return

    setItems((prev) => [createRecord(form), ...prev])
    setForm(getInitialForm(fields))
    setShowModal(false)
  }

  return (
    <div className="page-stack">
      <SectionCard
        title={title}
        description={description}
        action={
          <button className="primary-button small" type="button" onClick={() => setShowModal(true)}>
            {actionLabel}
          </button>
        }
      >
        <DataTable columns={columns} rows={items} />
      </SectionCard>

      {children}

      <Modal
        open={showModal}
        title={actionLabel}
        onClose={() => setShowModal(false)}
        footer={
          <button className="primary-button" type="button" onClick={handleCreate}>
            Save
          </button>
        }
      >
        <div className="form-grid">
          {fields.map((field) => (
            <label key={field.name}>
              <span>{field.label}</span>
              {field.options ? (
                <select name={field.name} value={form[field.name]} onChange={handleChange}>
                  {field.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  name={field.name}
                  type={field.type || 'text'}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                />
              )}
            </label>
          ))}
        </div>
      </Modal>
    </div>
  )
}

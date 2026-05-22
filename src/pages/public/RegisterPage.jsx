import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { roleLandingPath } from '../../utils/mockData'

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'student',
  department: 'Software Engineering',
}

export function RegisterPage() {
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)

    try {
      const profile = await register(form)
      navigate(roleLandingPath[profile.role] || '/app', { replace: true })
    } catch (submitError) {
      setError(submitError.message || 'Unable to create account.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="auth-header">
          <p className="eyebrow">Get Started</p>
          <h1>Create your SE-LMS account</h1>
          <p>Set up a student, lecturer, or admin profile connected to Firebase.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Full name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              required
            />
          </label>

          <label>
            Email address
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@school.edu"
              required
            />
          </label>

          <div className="form-grid">
            <label>
              Role
              <select name="role" value={form.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
                <option value="admin">Admin</option>
              </select>
            </label>

            <label>
              Department
              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="Software Engineering"
                required
              />
            </label>
          </div>

          <div className="form-grid">
            <label>
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </label>

            <label>
              Confirm password
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                required
              />
            </label>
          </div>

          <button type="submit" className="primary-button wide" disabled={submitting}>
            {submitting ? 'Creating account...' : 'Create account'}
          </button>

          {error && <p className="error-text">{error}</p>}
        </form>

        <div className="auth-links">
          <Link to="/login">Already have an account?</Link>
        </div>
      </section>
    </main>
  )
}

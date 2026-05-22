import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { roleLandingPath } from '../../utils/mockData'

const initialState = {
  email: '',
  password: '',
  role: 'student',
}

export function LoginPage() {
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login, isFirebaseConfigured } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const redirectTo = location.state?.from?.pathname

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const profile = await login(form)
      navigate(redirectTo || roleLandingPath[profile.role] || '/app', { replace: true })
    } catch (submitError) {
      setError(submitError.message || 'Unable to login.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="auth-header">
          <p className="eyebrow">Welcome Back</p>
          <h1>Login to SE-LMS</h1>
          <p>Access courses, coding labs, announcements, and assignment workflows.</p>
        </div>

        {!isFirebaseConfigured && (
          <div className="info-banner">
            Demo mode is active. Pick a role to preview each dashboard instantly.
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
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

          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </label>

          {!isFirebaseConfigured && (
            <label>
              Preview role
              <select name="role" value={form.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          )}

          <button type="submit" className="primary-button wide" disabled={submitting}>
            {submitting ? 'Signing in...' : 'Login'}
          </button>

          {error && <p className="error-text">{error}</p>}
        </form>

        <div className="auth-links">
          <Link to="/forgot-password">Forgot password?</Link>
          <span />
          <Link to="/register">Create an account</Link>
        </div>
      </section>
    </main>
  )
}

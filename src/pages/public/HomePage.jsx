import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { roleLandingPath } from '../../utils/mockData'

const initialLoginForm = {
  email: '',
  password: '',
  role: 'student',
}

const initialRegisterForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'student',
  department: 'Software Engineering',
}

export function HomePage() {
  const [activePanel, setActivePanel] = useState('login')
  const [loginForm, setLoginForm] = useState(initialLoginForm)
  const [registerForm, setRegisterForm] = useState(initialRegisterForm)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login, register, isFirebaseConfigured } = useAuth()
  const navigate = useNavigate()

  const handleLoginChange = (event) => {
    const { name, value } = event.target
    setLoginForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegisterChange = (event) => {
    const { name, value } = event.target
    setRegisterForm((prev) => ({ ...prev, [name]: value }))
  }

  const goToPanel = (panel) => {
    setError('')
    setActivePanel(panel)
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const profile = await login(loginForm)
      navigate(roleLandingPath[profile.role] || '/app', { replace: true })
    } catch (submitError) {
      setError(submitError.message || 'Unable to login.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleRegisterSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)

    try {
      const profile = await register(registerForm)
      navigate(roleLandingPath[profile.role] || '/app', { replace: true })
    } catch (submitError) {
      setError(submitError.message || 'Unable to create account.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="marketing-page">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Software Engineering LMS</p>
          <h1>Learn, submit assignments, and practice coding—all in one simple app.</h1>
          <p className="hero-text">
            Get started with a student, lecturer, or admin account to access your
            dedicated dashboard.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="primary-button">
              Create account
            </Link>
            <Link to="/login" className="ghost-button">
              Login
            </Link>
          </div>
        </div>

        <div className="landing-auth-shell">
          <div className="landing-auth-card">
            <div className="auth-switch">
              <button
                type="button"
                className={activePanel === 'login' ? 'active' : ''}
                onClick={() => goToPanel('login')}
              >
                Login
              </button>
              <button
                type="button"
                className={activePanel === 'register' ? 'active' : ''}
                onClick={() => goToPanel('register')}
              >
                Sign up
              </button>
            </div>

            <div className="landing-panel">
              <form
                className={`auth-form form-slide ${activePanel === 'login' ? 'active' : 'hidden'}`}
                onSubmit={handleLoginSubmit}
              >
                <label>
                  Email address
                  <input
                    type="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    placeholder="you@school.edu"
                    required
                  />
                </label>

                <label>
                  Password
                  <input
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    placeholder="Enter your password"
                    required
                  />
                </label>

                {!isFirebaseConfigured && (
                  <label>
                    Preview role
                    <select name="role" value={loginForm.role} onChange={handleLoginChange}>
                      <option value="student">Student</option>
                      <option value="lecturer">Lecturer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </label>
                )}

                <button type="submit" className="primary-button wide" disabled={submitting}>
                  {submitting ? 'Signing in...' : 'Login'}
                </button>
              </form>

              <form
                className={`auth-form form-slide ${activePanel === 'register' ? 'active' : 'hidden'}`}
                onSubmit={handleRegisterSubmit}
              >
                <label>
                  Full name
                  <input
                    type="text"
                    name="name"
                    value={registerForm.name}
                    onChange={handleRegisterChange}
                    placeholder="Jane Doe"
                    required
                  />
                </label>

                <label>
                  Email address
                  <input
                    type="email"
                    name="email"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    placeholder="you@school.edu"
                    required
                  />
                </label>

                <div className="form-grid">
                  <label>
                    Role
                    <select name="role" value={registerForm.role} onChange={handleRegisterChange}>
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
                      value={registerForm.department}
                      onChange={handleRegisterChange}
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
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                      placeholder="Create a password"
                      required
                    />
                  </label>

                  <label>
                    Confirm password
                    <input
                      type="password"
                      name="confirmPassword"
                      value={registerForm.confirmPassword}
                      onChange={handleRegisterChange}
                      placeholder="Repeat password"
                      required
                    />
                  </label>
                </div>

                <button type="submit" className="primary-button wide" disabled={submitting}>
                  {submitting ? 'Creating account...' : 'Create account'}
                </button>
              </form>
            </div>

            {error && <p className="error-text">{error}</p>}
          </div>
        </div>
      </section>
    </main>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const { resetPassword } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')

    try {
      const response = await resetPassword(email)
      setMessage(response)
    } catch (submitError) {
      setError(submitError.message || 'Unable to send reset email.')
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-panel compact">
        <div className="auth-header">
          <p className="eyebrow">Password Recovery</p>
          <h1>Reset your password</h1>
          <p>Enter your email and SE-LMS will guide you back into your account.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@school.edu"
              required
            />
          </label>
          <button type="submit" className="primary-button wide">
            Send reset link
          </button>
          {message && <p className="success-text">{message}</p>}
          {error && <p className="error-text">{error}</p>}
        </form>

        <div className="auth-links">
          <Link to="/login">Back to login</Link>
        </div>
      </section>
    </main>
  )
}

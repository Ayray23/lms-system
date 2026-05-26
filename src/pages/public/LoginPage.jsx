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
  const [remember, setRemember] = useState(true)
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
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative overflow-hidden border-r border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-8 py-10 text-slate-100 sm:px-12 lg:px-16">
          <div className="absolute -left-16 top-24 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-violet-500/15 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-xl space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/15 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.4)]" />
              Premium developer-first LMS
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Sign in to your futuristic learning workspace.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-300">
                Access your courses, live coding rooms, AI study assistant, and project roadmap with one secure login.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Collaborate</p>
                <p className="mt-3 font-semibold text-white">Classroom code sessions</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Analyze</p>
                <p className="mt-3 font-semibold text-white">Performance dashboards</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16">
          <div className="w-full max-w-md rounded-[40px] border border-white/10 bg-slate-900/80 p-8 shadow-[0_40px_120px_rgba(14,165,233,0.15)] backdrop-blur-xl">
            <div className="mb-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Welcome back</p>
                  <h2 className="text-3xl font-semibold text-white">Login to SE-LMS</h2>
                </div>
                <div className="rounded-3xl bg-slate-950/70 px-3 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">
                  secure
                </div>
              </div>
              <p className="text-sm leading-6 text-slate-400">
                Enter your credentials to continue your learning journey and join the next generation of engineers.
              </p>
            </div>

            {!isFirebaseConfigured && (
              <div className="mb-5 rounded-3xl border border-cyan-400/10 bg-cyan-500/10 p-4 text-sm text-cyan-100">
                Demo mode active. Pick a role to preview each dashboard instantly.
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@school.edu"
                  required
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              {isFirebaseConfigured ? null : (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-200">Preview role</label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  >
                    <option value="student">Student</option>
                    <option value="lecturer">Lecturer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-slate-400">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    className="h-4 w-4 rounded border-white/10 bg-slate-950 text-cyan-400 focus:ring-cyan-400"
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-cyan-300 transition hover:text-cyan-100">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-5 py-3 text-base font-semibold text-slate-950 shadow-[0_18px_40px_rgba(56,189,248,0.24)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? 'Signing in...' : 'Login'}
              </button>

              {error && <p className="text-sm text-red-300">{error}</p>}
            </form>

            <div className="mt-6 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
              <p>Or continue with</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button className="flex-1 rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 transition hover:border-cyan-300/30">
                  Google
                </button>
                <button className="flex-1 rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 transition hover:border-cyan-300/30">
                  GitHub
                </button>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-slate-400">
              Don’t have an account?{' '}
              <Link to="/register" className="text-cyan-300 transition hover:text-cyan-100">
                Sign Up
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

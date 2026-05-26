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
  const [step, setStep] = useState(1)
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleContinue = (event) => {
    event.preventDefault()
    setError('')
    setStep(2)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!agree) {
      setError('You must accept the terms to continue.')
      return
    }

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
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="grid min-h-screen grid-cols-1 gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <section className="relative overflow-hidden border-r border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-8 py-10 text-slate-100 sm:px-12 lg:px-16">
          <div className="absolute -left-16 top-24 h-36 w-36 rounded-full bg-purple-500/15 blur-3xl" />
          <div className="absolute right-8 top-28 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-xl space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/15 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.4)]" />
              Multi-step sign-up with AI-ready onboarding
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Join SE-LMS and unlock your coding superpowers.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-300">
                Create a premium student, lecturer, or admin account and step into a collaborative learning platform built for modern engineers.
              </p>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.25)] backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">How it works</p>
              <ol className="mt-5 space-y-4 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-8 w-8 rounded-2xl bg-cyan-500/10 text-cyan-200 grid place-items-center font-semibold">1</span>
                  Fill your profile details
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-8 w-8 rounded-2xl bg-cyan-500/10 text-cyan-200 grid place-items-center font-semibold">2</span>
                  Choose your role and learning path
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-8 w-8 rounded-2xl bg-cyan-500/10 text-cyan-200 grid place-items-center font-semibold">3</span>
                  Enter the portal with instant course recommendations
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16">
          <div className="w-full max-w-md rounded-[40px] border border-white/10 bg-slate-900/80 p-8 shadow-[0_40px_120px_rgba(14,165,233,0.15)] backdrop-blur-xl">
            <div className="mb-8 space-y-4">
              <div className="rounded-3xl bg-slate-950/80 px-4 py-3 text-xs uppercase tracking-[0.3em] text-slate-300">
                Step {step} of 2
              </div>
              <h2 className="text-3xl font-semibold text-white">Create your account</h2>
              <p className="text-sm leading-6 text-slate-400">
                Register quickly and join the future of software engineering education.
              </p>
            </div>

            <form className="space-y-5" onSubmit={step === 1 ? handleContinue : handleSubmit}>
              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-200">Full name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      required
                      className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                  </div>

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

                  <button className="w-full rounded-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-5 py-3 text-base font-semibold text-slate-950 shadow-[0_18px_40px_rgba(56,189,248,0.24)] transition hover:-translate-y-0.5">
                    Continue to Security
                  </button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-200">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                      className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-200">Confirm password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repeat password"
                      required
                      className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-200">Role</label>
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

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-200">Department</label>
                      <input
                        type="text"
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        placeholder="Software Engineering"
                        required
                        className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={() => setAgree(!agree)}
                      className="h-4 w-4 rounded border-white/10 bg-slate-950 text-cyan-400 focus:ring-cyan-400"
                    />
                    <span>I agree to the terms and privacy policy.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-5 py-3 text-base font-semibold text-slate-950 shadow-[0_18px_40px_rgba(56,189,248,0.24)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? 'Creating account...' : 'Create account'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30"
                  >
                    Back to details
                  </button>
                </>
              )}
            </form>

            {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

            <div className="mt-8 text-center text-sm text-slate-400">
              <p>Or sign up with</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button className="flex-1 rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 transition hover:border-cyan-300/30">
                  Google
                </button>
                <button className="flex-1 rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 transition hover:border-cyan-300/30">
                  GitHub
                </button>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-slate-400">
              Already signed up?{' '}
              <Link to="/login" className="text-cyan-300 transition hover:text-cyan-100">
                Login
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

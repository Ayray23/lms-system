import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { dashboardStats, roleNavigation } from '../utils/mockData'

export function DashboardLayout() {
  const { currentUser, logout, isFirebaseConfigured } = useAuth()
  const navigate = useNavigate()
  const navItems = roleNavigation[currentUser?.role] || []
  const stats = dashboardStats[currentUser?.role] || []

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="grid min-h-screen grid-cols-[280px_1fr]">
        <aside className="sticky top-0 h-screen border-r border-slate-800 bg-slate-950/90 px-6 py-8 shadow-[0_0_60px_rgba(0,0,0,0.35)] backdrop-blur overflow-y-auto">
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.2)]">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">SE-LMS</p>
              <h1 className="mt-3 text-2xl font-semibold text-white">Learning Workspace</h1>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Centralized dashboard for your role, courses, and assignments.
              </p>
              <span className="mt-5 inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-300">
                {isFirebaseConfigured ? 'Firebase connected' : 'Demo mode'}
              </span>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="text-sm font-semibold text-slate-300">Navigation</p>
              <nav className="mt-4 flex flex-col gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `rounded-2xl px-4 py-3 text-sm transition ${
                        isActive
                          ? 'bg-slate-100 text-slate-950 shadow-sm'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>

          <div className=" pt-4 mt-5 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 text-slate-300 shadow-inner shadow-black/20">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Signed in as</p>
            <p className="mt-3 text-lg font-semibold text-white">{currentUser?.name || 'Guest User'}</p>
            <p className="text-sm text-slate-400">{currentUser?.role || 'Visitor'}</p>
          </div>
        </aside>

        <div className="flex flex-col">
          <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 py-5 backdrop-blur">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Dashboard</p>
              <h2 className="mt-1 text-3xl font-semibold text-white">
                Welcome back, {currentUser?.name?.split(' ')[0] || 'Learner'}
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Review your latest activity, discover your next task, and keep your learning on track.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="flex w-full max-w-sm items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-300 shadow-inner shadow-black/10 focus-within:border-slate-500 sm:w-auto">
                <span className="text-slate-400">Search</span>
                <input
                  type="search"
                  className="min-w-0 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
                  placeholder="Search courses, assignments, or users"
                />
              </label>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-6 py-6">
            <section className="mb-6 grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
              <article className="rounded-[32px] border border-slate-800 bg-slate-900/85 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Platform summary</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">Your role overview</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      The key metrics below keep you ahead of every deadline and course update.
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-950/80 px-4 py-3 text-sm text-slate-200 shadow-sm ring-1 ring-slate-800">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    {currentUser?.role ? `${currentUser.role} workspace` : 'Role not assigned'}
                  </div>
                </div>
              </article>

              <div className="grid gap-4 sm:grid-cols-2">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-slate-800 bg-slate-900/85 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.25)]"
                  >
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-sm text-slate-500">{item.meta}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
              <section className="rounded-[32px] border border-slate-800 bg-slate-900/85 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
                <h3 className="text-xl font-semibold text-white">Workspace content</h3>
                <p className="mt-2 text-sm text-slate-400">
                  This area loads the selected section from the sidebar so you can work seamlessly without leaving the dashboard.
                </p>
                <div className="mt-6 pt-6  border-t border-slate-800">
                  <Outlet />
                </div>
              </section>

              <aside className="space-y-6">
                <div className="rounded-[32px] border border-slate-800 bg-slate-900/85 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
                  <div className="flex items-center justify-between">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Quick actions</p>
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">Live</span>
                  </div>
                  <div className="mt-5 space-y-3">
                    <button className="w-full rounded-2xl bg-slate-950/80 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-slate-800">
                      Review recent submissions
                    </button>
                    <button className="w-full rounded-2xl bg-slate-950/80 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-slate-800">
                      Open latest course material
                    </button>
                    <button className="w-full rounded-2xl bg-slate-950/80 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-slate-800">
                      Update your profile
                    </button>
                  </div>
                </div>

                <div className="rounded-[32px] border border-slate-800 bg-slate-900/85 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Status</p>
                  <div className="mt-4 rounded-3xl bg-slate-950/80 p-4 text-sm text-slate-300">
                    <p className="font-medium text-white">{isFirebaseConfigured ? 'Real data enabled' : 'Demo preview active'}</p>
                    <p className="mt-2 text-sm text-slate-400">
                      {isFirebaseConfigured
                        ? 'Your workspace is connected to Firebase and live platform data is available.'
                        : 'Demo mode is enabled so you can explore the dashboard without a connected backend.'}
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

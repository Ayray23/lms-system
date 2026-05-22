import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { roleNavigation } from '../utils/mockData'

export function DashboardLayout() {
  const { currentUser, logout, isFirebaseConfigured } = useAuth()
  const navigate = useNavigate()
  const navItems = roleNavigation[currentUser?.role] || []

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <p className="eyebrow">SE-LMS</p>
          <h1>Learning Workspace</h1>
          <span className="status-pill">
            {isFirebaseConfigured ? 'Firebase connected' : 'Demo mode'}
          </span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="content-shell">
        <header className="topbar">
          <label className="searchbar">
            <input type="search" placeholder="Search courses, assignments, or users" />
          </label>
          <div className="topbar-actions">
            <button type="button" className="ghost-button">
              Notifications
            </button>
            <div className="profile-chip">
              <strong>{currentUser?.name}</strong>
              <span>{currentUser?.role}</span>
            </div>
            <button type="button" className="primary-button small" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

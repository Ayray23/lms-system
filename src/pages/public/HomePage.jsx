import { Link } from 'react-router-dom'
import { platformHighlights } from '../../utils/mockData'

export function HomePage() {
  return (
    <main className="marketing-page">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Software Engineering LMS</p>
          <h1>Firebase-powered learning, assignments, and coding practice in one place.</h1>
          <p className="hero-text">
            Built for Software Engineering and Computer Science programs with
            dedicated student, lecturer, and admin experiences.
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

        <div className="hero-grid">
          {platformHighlights.map((item) => (
            <article key={item} className="mini-panel">
              <span className="mini-dot" />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

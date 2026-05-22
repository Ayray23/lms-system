export function StatCard({ label, value, meta }) {
  return (
    <article className="stat-card">
      <p className="stat-label">{label}</p>
      <h3>{value}</h3>
      <p className="stat-meta">{meta}</p>
    </article>
  )
}

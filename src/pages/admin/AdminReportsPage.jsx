import { SectionCard } from '../../components/SectionCard'
import { adminReports } from '../../utils/mockData'

export function AdminReportsPage() {
  return (
    <div className="page-stack">
      <SectionCard
        title="Reports & Analytics"
        description="View platform analytics, student performance, and course outcomes."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {adminReports.map((report) => (
            <article key={report.label} className="rounded-3xl border border-slate-800 bg-slate-900/85 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
              <p className="text-sm text-slate-400">{report.label}</p>
              <p className="mt-4 text-3xl font-semibold text-white">{report.value}</p>
              <p className="mt-2 text-sm text-slate-500">{report.meta}</p>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

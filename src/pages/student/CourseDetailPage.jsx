import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SectionCard } from '../../components/SectionCard'
import { assignments, studentCourses } from '../../utils/mockData'

export function CourseDetailPage() {
  const { courseCode } = useParams()
  const navigate = useNavigate()
  const [enrolled, setEnrolled] = useState(false)

  const course = useMemo(() => {
    return studentCourses.find((item) => item.code === decodeURIComponent(courseCode))
  }, [courseCode])

  const courseAssignments = useMemo(() => {
    if (!course) return []
    return assignments.filter((assignment) => assignment.course === course.code)
  }, [course])

  if (!course) {
    return (
      <div className="page-stack p-6">
        <SectionCard title="Course not found" description="The course code does not match any available course.">
          <p className="text-slate-400">Please return to the course catalogue and select a valid course.</p>
          <div className="mt-6 flex gap-3">
            <button className="ghost-button" type="button" onClick={() => navigate('/app/student/courses')}>
              Back to courses
            </button>
          </div>
        </SectionCard>
      </div>
    )
  }

  return (
    <div className="page-stack p-6">
      <SectionCard
        title={`${course.code} — ${course.title}`}
        description={`In-depth course page for ${course.department}`}
        action={
          <button className="primary-button small" type="button" onClick={() => setEnrolled(true)}>
            {enrolled ? 'Enrolled' : 'Enroll now'}
          </button>
        }
      >
        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-slate-300">{course.summary}</p>
            <div className="rounded-3xl bg-slate-950/80 p-6 text-sm text-slate-300">
              <div className="grid gap-4 sm:grid-cols-2">
                <article>
                  <span className="text-slate-400">Lecturer</span>
                  <p className="mt-2 text-white">{course.lecturer}</p>
                </article>
                <article>
                  <span className="text-slate-400">Format</span>
                  <p className="mt-2 text-white">{course.format}</p>
                </article>
                <article>
                  <span className="text-slate-400">Credits</span>
                  <p className="mt-2 text-white">{course.credits}</p>
                </article>
                <article>
                  <span className="text-slate-400">Lessons</span>
                  <p className="mt-2 text-white">{course.lessons}</p>
                </article>
              </div>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-6 text-sm text-slate-300">
              <h3 className="text-lg font-semibold text-white">What you will learn</h3>
              <ul className="mt-4 list-disc space-y-3 pl-5">
                <li>Core concepts and practical exercises for {course.department.toLowerCase()}.</li>
                <li>Weekly projects, code walkthroughs, and review sessions.</li>
                <li>Assessment-ready work aligned with current semester goals.</li>
              </ul>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Course details</p>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <p>
                  <span className="block text-slate-400">Level</span>
                  {course.level}
                </p>
                <p>
                  <span className="block text-slate-400">Department</span>
                  {course.department}
                </p>
                <p>
                  <span className="block text-slate-400">Status</span>
                  {course.status}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Assignments</p>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                  {courseAssignments.length}
                </span>
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                {courseAssignments.length ? (
                  courseAssignments.map((assignment) => (
                    <div key={assignment.title} className="rounded-3xl bg-slate-950/70 p-3">
                      <p className="font-medium text-white">{assignment.title}</p>
                      <p className="text-slate-400">Due {assignment.deadline}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400">No active assignments for this course yet.</p>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 text-sm text-slate-300">
              <p className="font-semibold text-white">Next step</p>
              <p className="mt-3 text-slate-400">Use the catalogue or assignments page to continue working on this course.</p>
              <button className="mt-4 w-full rounded-2xl bg-slate-950/80 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800" type="button" onClick={() => navigate('/app/student/assignments')}>
                Open related assignments
              </button>
            </div>
          </aside>
        </div>

        {enrolled && (
          <div className="mt-6 rounded-3xl bg-emerald-500/10 p-5 text-sm text-emerald-200">
            You are enrolled in this course and it will appear in your course list.
          </div>
        )}
      </SectionCard>
    </div>
  )
}
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SectionCard } from '../../components/SectionCard'
import { assignments, studentCourses } from '../../utils/mockData'

export function CourseDetailPage() {
  const { courseCode } = useParams()
  const navigate = useNavigate()

  const course = useMemo(
    () => studentCourses.find((item) => item.code.toLowerCase() === courseCode?.toLowerCase()),
    [courseCode]
  )

  const courseAssignments = useMemo(
    () => assignments.filter((assignment) => assignment.course === course?.code),
    [course]
  )

  if (!course) {
    return (
      <div className="page-stack">
        <SectionCard title="Course not found" description="The selected course could not be located.">
          <p className="text-slate-300">Please return to the course catalogue and select a valid course card.</p>
          <button className="primary-button mt-6" type="button" onClick={() => navigate('/app/student/courses')}>
            Back to courses
          </button>
        </SectionCard>
      </div>
    )
  }

  return (
    <div className="page-stack">
      <SectionCard
        title={`${course.code} — ${course.title}`}
        description="Dedicated course detail page"
        action={
          <button className="ghost-button small" type="button" onClick={() => navigate('/app/student/assignments')}>
            View assignments
          </button>
        }
      >
        <div className="course-detail-grid">
          <div className="course-detail-meta">
            <p className="text-slate-300">{course.summary}</p>
            <div className="course-detail-stats">
              <div>
                <span>Lecturer</span>
                <strong>{course.lecturer}</strong>
              </div>
              <div>
                <span>Department</span>
                <strong>{course.department}</strong>
              </div>
              <div>
                <span>Level</span>
                <strong>{course.level}</strong>
              </div>
              <div>
                <span>Format</span>
                <strong>{course.format}</strong>
              </div>
              <div>
                <span>Credits</span>
                <strong>{course.credits}</strong>
              </div>
              <div>
                <span>Lessons</span>
                <strong>{course.lessons}</strong>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Quick actions</p>
            <div className="mt-5 flex flex-col gap-3">
              <button
                className="inline-flex items-center justify-center rounded-2xl bg-slate-950/80 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                type="button"
                onClick={() => navigate('/app/student/courses')}
              >
                Back to course catalogue
              </button>
              <button
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/20"
                type="button"
                onClick={() => navigate('/app/student/assignments')}
              >
                Open assignments for this course
              </button>
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="two-column-grid">
        <SectionCard title="Course outline" description="What you will learn and build during this course">
          <div className="stack-list">
            <article className="feed-item">
              <div>
                <strong>Module 1</strong>
                <p>Software architecture fundamentals and design pattern review.</p>
              </div>
              <span>Weeks 1–3</span>
            </article>
            <article className="feed-item">
              <div>
                <strong>Module 2</strong>
                <p>Systems modeling, documentation, and architecture case studies.</p>
              </div>
              <span>Weeks 4–6</span>
            </article>
            <article className="feed-item">
              <div>
                <strong>Module 3</strong>
                <p>Practical team labs, review sessions, and final project planning.</p>
              </div>
              <span>Weeks 7–10</span>
            </article>
          </div>
        </SectionCard>

        <SectionCard title="Course metrics" description="Progress indicators and assignments for this course">
          <div className="stack-list">
            <article className="feed-item">
              <div>
                <strong>Status</strong>
                <p>{course.status}</p>
              </div>
              <span>{course.lessons} lessons</span>
            </article>
            <article className="feed-item">
              <div>
                <strong>Peer review</strong>
                <p>Team evaluation, architecture critique, and project feedback.</p>
              </div>
              <span>Live</span>
            </article>
            <article className="feed-item">
              <div>
                <strong>Grading</strong>
                <p>Continuous assessment with final presentation scoring.</p>
              </div>
              <span>Updated weekly</span>
            </article>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Related assignments" description="Assignments tied to this course">
        {courseAssignments.length ? (
          <div className="stack-list">
            {courseAssignments.map((assignment) => (
              <article key={assignment.title} className="feed-item">
                <div>
                  <strong>{assignment.title}</strong>
                  <p>{assignment.status}</p>
                </div>
                <span>{assignment.deadline}</span>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-slate-950/80 p-6 text-slate-400">
            No assignments are currently attached to this course in the demo data.
          </div>
        )}
      </SectionCard>
    </div>
  )
}

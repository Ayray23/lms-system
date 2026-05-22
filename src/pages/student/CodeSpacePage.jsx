import { SectionCard } from '../../components/SectionCard'
import { codingProblems } from '../../utils/mockData'

export function CodeSpacePage() {
  return (
    <div className="page-stack">
      <section className="codespace-layout">
        <SectionCard title="Problem Description" description="Selected coding exercise">
          <div className="stack-list">
            {codingProblems.map((problem) => (
              <article key={problem.title} className="feed-item align-start">
                <div>
                  <strong>{problem.title}</strong>
                  <p>{problem.topic}</p>
                </div>
                <span>{problem.difficulty}</span>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Editor Workspace"
          description="Monaco Editor plugs in here in the next phase."
          action={
            <div className="inline-actions">
              <button className="ghost-button">Save</button>
              <button className="ghost-button">Run</button>
              <button className="primary-button small">Submit</button>
            </div>
          }
        >
          <div className="editor-placeholder">
            <div className="editor-toolbar">
              <span>Language: JavaScript</span>
              <span>Runtime: Judge0 or Piston</span>
            </div>
            <pre>{`function solve(input) {\n  // Write your solution here\n  return input;\n}`}</pre>
          </div>
        </SectionCard>
      </section>

      <SectionCard title="Output Console" description="Compilation output, logs, and runtime messages">
        <div className="console-panel">{'>> Ready for code execution integration.'}</div>
      </SectionCard>
    </div>
  )
}

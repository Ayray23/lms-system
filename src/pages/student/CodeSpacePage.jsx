import { useState } from 'react'
import { Modal } from '../../components/Modal'
import { SectionCard } from '../../components/SectionCard'
import { codingProblems } from '../../utils/mockData'

export function CodeSpacePage() {
  const [code, setCode] = useState(
    `function solve(input) {
  // Write your solution here
  return input;
}`
  )
  const [output, setOutput] = useState('>> Ready for code execution integration.')
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSave = () => {
    setOutput('>> Code saved successfully.')
  }

  const handleRun = () => {
    if (!code.trim()) {
      setOutput('>> Please add code before running.')
      return
    }

    setOutput('>> Running your code...\n>> No runtime engine connected yet. Preview this result locally.')
  }

  const handleConfirmSubmit = () => {
    setSubmitMessage('Submission received. Your code has been queued for review.')
    setShowSubmitModal(false)
    setOutput('>> Submission sent successfully.')
  }

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
              <button className="ghost-button" type="button" onClick={handleSave}>
                Save
              </button>
              <button className="ghost-button" type="button" onClick={handleRun}>
                Run
              </button>
              <button className="primary-button small" type="button" onClick={() => setShowSubmitModal(true)}>
                Submit
              </button>
            </div>
          }
        >
          <textarea
            className="code-editor"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            rows={16}
          />
        </SectionCard>
      </section>

      <SectionCard title="Output Console" description="Compilation output, logs, and runtime messages">
        <div className="console-panel">{output}</div>
      </SectionCard>

      <Modal
        open={showSubmitModal}
        title="Confirm Code Submission"
        onClose={() => setShowSubmitModal(false)}
        footer={
          <button className="primary-button" type="button" onClick={handleConfirmSubmit}>
            Confirm submit
          </button>
        }
      >
        <p className="text-slate-300">You are about to submit your solution for review.</p>
        <p className="text-slate-400">Once submitted, your code will be recorded and marked in the assignment workflow.</p>
        {submitMessage && (
          <div className="rounded-3xl bg-emerald-500/10 p-4 text-sm text-emerald-200">{submitMessage}</div>
        )}
      </Modal>
    </div>
  )
}

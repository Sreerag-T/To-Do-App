import { useState } from 'react'

function Header({ total, completed, onAdd }) {
  const [draft, setDraft] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(draft)
    setDraft('')
  }

  const progress = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <header className="header">
      <div className="header-top">
        <h1>Task List</h1>
        <span className="header-count">
          {completed} of {total} done
        </span>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <form className="add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="What do you need to do?"
          aria-label="New task"
        />
        <button type="submit">Add</button>
      </form>
    </header>
  )
}

export default Header

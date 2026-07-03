import { useState } from 'react'

function ToDoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)

  const startEditing = () => {
    setDraft(todo.text)
    setIsEditing(true)
  }

  const saveEdit = () => {
    onEdit(todo.id, draft)
    setIsEditing(false)
  }

  const cancelEdit = () => {
    setDraft(todo.text)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit()
    if (e.key === 'Escape') cancelEdit()
  }

  return (
    <li className={`todo-item ${todo.completed ? 'is-completed' : ''}`}>
      <label className="todo-checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="checkmark" />
      </label>

      {isEditing ? (
        <input
          className="edit-input"
          type="text"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={saveEdit}
        />
      ) : (
        <span className="todo-text" onDoubleClick={startEditing}>
          {todo.text}
        </span>
      )}

      <div className="todo-actions">
        {isEditing ? (
          <button onClick={saveEdit} className="action-btn save-btn">Save</button>
        ) : (
          <button onClick={startEditing} className="action-btn">Edit</button>
        )}
        <button onClick={() => onDelete(todo.id)} className="action-btn delete-btn">
          Delete
        </button>
      </div>
    </li>
  )
}

export default ToDoItem

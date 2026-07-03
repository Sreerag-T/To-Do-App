import { useState } from 'react'
import Header from './components/Header.jsx'
import ToDoList from './components/ToDoList.jsx'

const STARTER_TASKS = [
  { id: crypto.randomUUID(), text: 'Welcome! Try adding a task of your own', completed: false },
  { id: crypto.randomUUID(), text: 'Click a task to mark it complete', completed: true },
]

function App() {
  const [todos, setTodos] = useState(STARTER_TASKS)

  const addTodo = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos((prev) => [
      { id: crypto.randomUUID(), text: trimmed, completed: false },
      ...prev,
    ])
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const editTodo = (id, newText) => {
    const trimmed = newText.trim()
    if (!trimmed) return
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo))
    )
  }

  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <div className="app-shell">
      <Header total={todos.length} completed={completedCount} onAdd={addTodo} />
      <ToDoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  )
}

export default App

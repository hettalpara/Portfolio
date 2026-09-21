// Tasks.jsx - Practical 6: Full Stack Integration
// Kanban Task Manager connected to Node.js + Express + MongoDB backend
// Uses centralized api.js for all API calls
import React, { useState, useEffect } from 'react'
import { getTasks, createTask, updateTask, deleteTask } from '../api'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [apiConnected, setApiConnected] = useState(true)
  const [toast, setToast] = useState(null) // Toast notification state
  const [logs, setLogs] = useState([
    { id: 1, method: 'GET', path: '/api/tasks', timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) }
  ])

  // Helper: Add a log entry to the server activity console
  const addLog = (method, path) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false })
    setLogs(prev => [...prev.slice(-9), { id: Date.now() + Math.random(), method, path, timestamp: time }])
  }

  // Helper: Show a toast notification that auto-hides after 3 seconds
  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Fetch all tasks on component mount (GET /api/tasks)
  useEffect(() => {
    fetchTasks()
  }, [])

  // GET: Fetch all tasks from MongoDB via the backend
  const fetchTasks = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await getTasks()
      setTasks(result.data) // Backend returns { success, count, data: [...] }
      setApiConnected(true)
      addLog('GET', '/api/tasks')
    } catch (err) {
      setApiConnected(false)
      setError('Failed to connect to API on http://localhost:5000')
      console.error('Error fetching tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  // POST: Create a new task and add it to React state
  const addTask = async (e) => {
    e.preventDefault()
    if (!newTask.trim()) return

    try {
      const result = await createTask({ title: newTask.trim(), status: 'pending' })
      setTasks(prev => [...prev, result.data]) // Add returned task to state
      setNewTask('')
      setApiConnected(true)
      addLog('POST', '/api/tasks')
      showToast('✅ Task created successfully')
    } catch (err) {
      setError('Failed to add task.')
      showToast('❌ Failed to create task', 'error')
      console.error('Error adding task:', err)
    }
  }

  // PUT: Update task status and update it in React state
  const updateTaskStatus = async (id, nextStatus) => {
    try {
      const result = await updateTask(id, { status: nextStatus, completed: nextStatus === 'done' })
      setTasks(prev => prev.map(t => t._id === id ? result.data : t)) // Replace updated task
      setApiConnected(true)
      addLog('PUT', `/api/tasks/${id}`)
      showToast('✅ Task updated successfully')
    } catch (err) {
      setError('Failed to update task.')
      showToast('❌ Failed to update task', 'error')
      console.error('Error updating task:', err)
    }
  }

  // DELETE: Remove task after confirmation dialog
  const handleDeleteTask = async (id) => {
    // Confirmation dialog before deleting
    const confirmed = window.confirm('Are you sure you want to delete this task?')
    if (!confirmed) return

    try {
      await deleteTask(id)
      setTasks(prev => prev.filter(t => t._id !== id)) // Remove from state
      setApiConnected(true)
      addLog('DELETE', `/api/tasks/${id}`)
      showToast('✅ Task deleted successfully')
    } catch (err) {
      setError('Failed to delete task.')
      showToast('❌ Failed to delete task', 'error')
      console.error('Error deleting task:', err)
    }
  }

  // Filter tasks by status for Kanban columns
  const getColumnTasks = (status) => {
    return tasks.filter(t => (t.status || (t.completed ? 'done' : 'pending')) === status)
  }

  const pendingTasks = getColumnTasks('pending')
  const inProgressTasks = getColumnTasks('in-progress')
  const doneTasks = getColumnTasks('done')

  return (
    <section className="tasks-page" id="tasks">
      <div className="section-container">

        {/* Toast Notification */}
        {toast && (
          <div className={`toast-notification ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>
            {toast.message}
          </div>
        )}

        {/* Header Section */}
        <div className="tasks-header-wrapper">
          <div>
            <h2 className="section-title">Task Manager</h2>
          </div>

          <div className="tasks-meta-badges">
            <span className="task-count-pill">
              📋 {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'}
            </span>
            <span className={`api-status-pill ${apiConnected ? '' : 'disconnected'}`}>
              <span className="status-dot"></span>
              {apiConnected ? 'API Connected' : 'API Disconnected'}
            </span>
          </div>
        </div>


        {/* Add Task Input Form */}
        <form className="task-input-card" onSubmit={addTask}>
          <div className="input-wrapper">
            <span className="plus-icon">➕</span>
            <input
              type="text"
              className="task-input-field"
              placeholder="Add a new task and press enter..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary add-task-btn">
            Add Task
          </button>
        </form>

        {/* Error Alert Banner */}
        {error && (
          <div className="task-error-banner">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p className="spinner-text">Loading tasks from MongoDB...</p>
          </div>
        ) : (
          /* Kanban Board Columns */
          <div className="kanban-board">

            {/* Pending Column */}
            <div className="kanban-column column-pending">
              <div className="column-header">
                <div className="column-title-group">
                  <span className="column-dot pending-dot">●</span>
                  <h3>Pending</h3>
                </div>
                <span className="column-count">{pendingTasks.length}</span>
              </div>
              <div className="column-cards">
                {pendingTasks.length === 0 ? (
                  <div className="empty-column-box">No tasks here yet</div>
                ) : (
                  pendingTasks.map(task => (
                    <div key={task._id} className="kanban-task-card pending-card">
                      <div className="card-top">
                        <span className="task-name">{task.title}</span>
                        <button className="card-close-btn" onClick={() => handleDeleteTask(task._id)}>×</button>
                      </div>
                      <div className="card-bottom">
                        <span className="task-id">#{task._id.slice(-6)}</span>
                        <button
                          className="status-step-btn"
                          onClick={() => updateTaskStatus(task._id, 'in-progress')}
                        >
                          in-progress →
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* In Progress Column */}
            <div className="kanban-column column-in-progress">
              <div className="column-header">
                <div className="column-title-group">
                  <span className="column-dot in-progress-dot">●</span>
                  <h3>In Progress</h3>
                </div>
                <span className="column-count">{inProgressTasks.length}</span>
              </div>
              <div className="column-cards">
                {inProgressTasks.length === 0 ? (
                  <div className="empty-column-box">No tasks here yet</div>
                ) : (
                  inProgressTasks.map(task => (
                    <div key={task._id} className="kanban-task-card in-progress-card">
                      <div className="card-top">
                        <span className="task-name">{task.title}</span>
                        <button className="card-close-btn" onClick={() => handleDeleteTask(task._id)}>×</button>
                      </div>
                      <div className="card-bottom">
                        <span className="task-id">#{task._id.slice(-6)}</span>
                        <button
                          className="status-step-btn"
                          onClick={() => updateTaskStatus(task._id, 'done')}
                        >
                          done →
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Done Column */}
            <div className="kanban-column column-done">
              <div className="column-header">
                <div className="column-title-group">
                  <span className="column-dot done-dot">●</span>
                  <h3>Done</h3>
                </div>
                <span className="column-count">{doneTasks.length}</span>
              </div>
              <div className="column-cards">
                {doneTasks.length === 0 ? (
                  <div className="empty-column-box">No tasks here yet</div>
                ) : (
                  doneTasks.map(task => (
                    <div key={task._id} className="kanban-task-card done-card">
                      <div className="card-top">
                        <span className="task-name done-title">{task.title}</span>
                        <button className="card-close-btn" onClick={() => handleDeleteTask(task._id)}>×</button>
                      </div>
                      <div className="card-bottom">
                        <span className="task-id">#{task._id.slice(-6)}</span>
                        <button
                          className="status-step-btn revert-btn"
                          onClick={() => updateTaskStatus(task._id, 'pending')}
                        >
                          reopen ←
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  )
}

export default Tasks

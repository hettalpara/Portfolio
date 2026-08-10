// Tasks.jsx - Kanban Task Manager with Live Server Activity Console
import React, { useState, useEffect } from 'react'

const API_URL = 'http://localhost:5000/api/tasks'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [apiConnected, setApiConnected] = useState(true)
  const [logs, setLogs] = useState([
    { id: 1, method: 'GET', path: '/api/tasks', timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) }
  ])

  const addLog = (method, path) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false })
    setLogs(prev => [...prev.slice(-9), { id: Date.now() + Math.random(), method, path, timestamp: time }])
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error(`Status: ${response.status}`)
      const data = await response.json()
      setTasks(data)
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

  const addTask = async (e) => {
    e.preventDefault()
    if (!newTask.trim()) return

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTask.trim(), status: 'pending' })
      })
      if (!response.ok) throw new Error(`Status: ${response.status}`)
      const createdTask = await response.json()
      setTasks(prev => [...prev, createdTask])
      setNewTask('')
      setApiConnected(true)
      addLog('POST', `/api/tasks`)
    } catch (err) {
      setError('Failed to add task.')
      console.error('Error adding task:', err)
    }
  }

  const updateTaskStatus = async (id, nextStatus) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus, completed: nextStatus === 'done' })
      })
      if (!response.ok) throw new Error(`Status: ${response.status}`)
      const updatedTask = await response.json()
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t))
      setApiConnected(true)
      addLog('PUT', `/api/tasks/${id}`)
    } catch (err) {
      setError('Failed to update task.')
      console.error('Error updating task:', err)
    }
  }

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error(`Status: ${response.status}`)
      setTasks(prev => prev.filter(t => t.id !== id))
      setApiConnected(true)
      addLog('DELETE', `/api/tasks/${id}`)
    } catch (err) {
      setError('Failed to delete task.')
      console.error('Error deleting task:', err)
    }
  }

  const getColumnTasks = (status) => {
    return tasks.filter(t => (t.status || (t.completed ? 'done' : 'pending')) === status)
  }

  const pendingTasks = getColumnTasks('pending')
  const inProgressTasks = getColumnTasks('in-progress')
  const doneTasks = getColumnTasks('done')

  return (
    <div className="tasks-page-kanban">
      <div className="kanban-container">
        
        {/* Header Bar */}
        <div className="kanban-header">
          <div className="header-left">
            <span className="terminal-path">~/task-manager</span>
            <h1 className="kanban-title">Task Manager</h1>
          </div>
          <div className="header-right">
            <span className="task-count-badge">{tasks.length} tasks</span>
            <div className={`api-status-pill ${apiConnected ? 'connected' : 'disconnected'}`}>
              <span className="status-dot"></span>
              {apiConnected ? 'API connected' : 'API offline'}
            </div>
          </div>
        </div>

        {/* Server Activity Terminal */}
        <div className="server-activity-card">
          <div className="activity-header">
            <div className="terminal-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <span className="activity-title">SERVER ACTIVITY</span>
          </div>
          <div className="activity-body">
            <div className="terminal-prompt">$ _</div>
            <div className="logs-list">
              {logs.map((log) => (
                <div key={log.id} className="log-row">
                  <span className={`log-method ${log.method.toLowerCase()}`}>{log.method}</span>
                  <span className="log-path">{log.path}</span>
                  <span className="log-time">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Task Input Form */}
        <form className="kanban-input-form" onSubmit={addTask}>
          <div className="input-wrapper">
            <span className="plus-icon">+</span>
            <input
              type="text"
              className="kanban-input"
              placeholder="Add a task and press enter..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </div>
          <button type="submit" className="kanban-add-btn">
            Add task
          </button>
        </form>

        {/* Error Alert if any */}
        {error && (
          <div className="kanban-error-banner">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        {/* Kanban Board Columns */}
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
                  <div key={task.id} className="kanban-task-card pending-card">
                    <div className="card-top">
                      <span className="task-name">{task.title}</span>
                      <button className="card-close-btn" onClick={() => deleteTask(task.id)}>×</button>
                    </div>
                    <div className="card-bottom">
                      <span className="task-id">#{task.id}</span>
                      <button
                        className="status-step-btn"
                        onClick={() => updateTaskStatus(task.id, 'in-progress')}
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
                  <div key={task.id} className="kanban-task-card in-progress-card">
                    <div className="card-top">
                      <span className="task-name">{task.title}</span>
                      <button className="card-close-btn" onClick={() => deleteTask(task.id)}>×</button>
                    </div>
                    <div className="card-bottom">
                      <span className="task-id">#{task.id}</span>
                      <button
                        className="status-step-btn"
                        onClick={() => updateTaskStatus(task.id, 'done')}
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
                  <div key={task.id} className="kanban-task-card done-card">
                    <div className="card-top">
                      <span className="task-name done-title">{task.title}</span>
                      <button className="card-close-btn" onClick={() => deleteTask(task.id)}>×</button>
                    </div>
                    <div className="card-bottom">
                      <span className="task-id">#{task.id}</span>
                      <button
                        className="status-step-btn revert-btn"
                        onClick={() => updateTaskStatus(task.id, 'pending')}
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

      </div>
    </div>
  )
}

export default Tasks

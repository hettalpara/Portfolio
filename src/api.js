

const BASE_URL = "http://localhost:5000"

function authHeaders(includeContentType = false) {
  const headers = includeContentType ? { 'Content-Type': 'application/json' } : {}
  const token = localStorage.getItem('token')
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, options)
  const result = await response.json().catch(() => ({}))

  if (response.status === 401) {
    localStorage.removeItem('token')
    if (window.location.pathname !== '/login') window.location.href = '/login'
  }

  if (!response.ok) {
    throw new Error(result.message || `Request failed (Status: ${response.status})`)
  }

  return result
}

export function registerUser(credentials) {
  return request('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
}

export function loginUser(credentials) {
  return request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
}

export function getCurrentUser() {
  return request('/auth/me', { headers: authHeaders() })
}

export async function getTasks() {
  return request('/tasks', { headers: authHeaders() })
}

export async function createTask(taskData) {
  return request('/tasks', {
    method: 'POST',
    headers: authHeaders(true),
    body: JSON.stringify(taskData)
  })
}

export async function updateTask(id, updatedData) {
  return request(`/tasks/${id}`, {
    method: 'PUT',
    headers: authHeaders(true),
    body: JSON.stringify(updatedData)
  })
}

// DELETE a task by ID
export async function deleteTask(id) {
  return request(`/tasks/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  })
}

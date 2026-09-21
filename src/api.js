

const BASE_URL = "http://localhost:5000"

export async function getTasks() {
  const response = await fetch(`${BASE_URL}/tasks`)
  if (!response.ok) throw new Error(`Failed to fetch tasks (Status: ${response.status})`)
  const result = await response.json()
  return result 
}

export async function createTask(taskData) {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  })
  if (!response.ok) throw new Error(`Failed to create task (Status: ${response.status})`)
  const result = await response.json()
  return result // { success: true, data: {...} }
}

export async function updateTask(id, updatedData) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  })
  if (!response.ok) throw new Error(`Failed to update task (Status: ${response.status})`)
  const result = await response.json()
  return result // { success: true, data: {...} }
}

// DELETE a task by ID
export async function deleteTask(id) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) throw new Error(`Failed to delete task (Status: ${response.status})`)
  const result = await response.json()
  return result // { success: true, message: "...", data: {...} }
}

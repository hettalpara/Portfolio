const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// =========================================================================
// CORS Middleware — Allow React frontend (port 5173) to access this API
// =========================================================================
app.use(cors());

// In-memory array for task storage
let tasks = [
  { id: 1, title: "Learn React Hooks", status: "pending", completed: false },
  { id: 2, title: "Integrate GitHub API", status: "in-progress", completed: false },
  { id: 3, title: "Build Express REST API", status: "done", completed: true }
];

// =========================================================================
// 1. JSON Body Parser Middleware
// =========================================================================
app.use(express.json());

// =========================================================================
// 2. Static File Serving Middleware
// =========================================================================
// Serves front-end assets from the 'public' directory
app.use(express.static("public"));

// =========================================================================
// 3. Global Logging Middleware
// =========================================================================
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${req.method} ${req.originalUrl} - ${timestamp}`);
  next();
});

// =========================================================================
// 4. Content-Type Validation Middleware (for POST and PUT)
// =========================================================================
app.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        success: false,
        error: "Content-Type must be application/json"
      });
    }
  }
  next();
});

// =========================================================================
// Route-Specific Task ID Validation Middleware
// =========================================================================
function validateTaskId(req, res, next) {
  const idStr = req.params.id;
  const idNum = Number(idStr);

  // Validate that the ID is a string of digits representing a positive integer
  if (!/^\d+$/.test(idStr) || idNum <= 0) {
    return res.status(400).json({
      success: false,
      error: "Invalid task ID. ID must be a positive integer."
    });
  }

  req.taskId = idNum;
  next();
}

// Helper to normalize task status
function getNormalizedStatus(status, completed) {
  if (status && ['pending', 'in-progress', 'done'].includes(status)) {
    return status;
  }
  return completed ? 'done' : 'pending';
}

// =========================================================================
// 5. REST API Routes (supports both /tasks and /api/tasks)
// =========================================================================

const handleGetTasks = (req, res) => {
  res.status(200).json(tasks.map(t => ({
    ...t,
    status: getNormalizedStatus(t.status, t.completed),
    completed: t.status ? t.status === 'done' : t.completed
  })));
};

app.get('/tasks', handleGetTasks);
app.get('/api/tasks', handleGetTasks);

const handleGetTaskById = (req, res) => {
  const task = tasks.find(t => t.id === req.taskId);
  if (!task) {
    return res.status(404).json({
      success: false,
      error: `Task with ID ${req.taskId} not found`
    });
  }
  res.status(200).json({
    ...task,
    status: getNormalizedStatus(task.status, task.completed),
    completed: task.status ? task.status === 'done' : task.completed
  });
};

app.get('/tasks/:id', validateTaskId, handleGetTaskById);
app.get('/api/tasks/:id', validateTaskId, handleGetTaskById);

const handlePostTask = (req, res) => {
  const { title, completed, status } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({
      success: false,
      error: "Title is required and must be a non-empty string."
    });
  }

  const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  const taskStatus = status && ['pending', 'in-progress', 'done'].includes(status) 
    ? status 
    : (completed ? 'done' : 'pending');

  const newTask = {
    id: newId,
    title: title.trim(),
    status: taskStatus,
    completed: taskStatus === 'done'
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

app.post('/tasks', handlePostTask);
app.post('/api/tasks', handlePostTask);

const handlePutTask = (req, res) => {
  const task = tasks.find(t => t.id === req.taskId);
  if (!task) {
    return res.status(404).json({
      success: false,
      error: `Task with ID ${req.taskId} not found`
    });
  }

  const { title, completed, status } = req.body;

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        success: false,
        error: "Title must be a non-empty string."
      });
    }
    task.title = title.trim();
  }

  if (status !== undefined) {
    if (['pending', 'in-progress', 'done'].includes(status)) {
      task.status = status;
      task.completed = status === 'done';
    }
  } else if (completed !== undefined) {
    if (typeof completed !== 'boolean') {
      return res.status(400).json({
        success: false,
        error: "Completed status must be a boolean."
      });
    }
    task.completed = completed;
    task.status = completed ? 'done' : 'pending';
  }

  res.status(200).json({
    ...task,
    status: getNormalizedStatus(task.status, task.completed),
    completed: task.status ? task.status === 'done' : task.completed
  });
};

app.put('/tasks/:id', validateTaskId, handlePutTask);
app.put('/api/tasks/:id', validateTaskId, handlePutTask);

const handleDeleteTask = (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === req.taskId);
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: `Task with ID ${req.taskId} not found`
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    task: deletedTask
  });
};

app.delete('/tasks/:id', validateTaskId, handleDeleteTask);
app.delete('/api/tasks/:id', validateTaskId, handleDeleteTask);

// =========================================================================
// 6. Custom 404 Handler (for unmatched routes)
// =========================================================================
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
    path: req.originalUrl
  });
});

// =========================================================================
// 7. Global Error Handler Middleware (LAST middleware)
// =========================================================================
app.use((err, req, res, next) => {
  // Log the detailed error on the server
  console.error("Internal Server Error details:", err);

  // Return generic error message to client (no raw stack trace)
  res.status(500).json({
    success: false,
    error: "Something went wrong"
  });
});

// =========================================================================
// 8. Start the Server
// =========================================================================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

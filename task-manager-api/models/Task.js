const mongoose = require('mongoose');

// =========================================================================
// Task Schema Definition
// =========================================================================
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: {
      values: ['low', 'medium', 'high'],
      message: 'Priority must be low, medium, or high'
    },
    default: 'medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// =========================================================================
// Pre-Save Hook — Trim extra whitespace from title
// =========================================================================
taskSchema.pre('save', function (next) {
  if (this.title) {
    // Remove leading/trailing whitespace and collapse internal spaces
    this.title = this.title.trim().replace(/\s+/g, ' ');
  }
  next();
});

// Export the model
module.exports = mongoose.model('Task', taskSchema);

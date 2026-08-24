const mongoose = require('mongoose');

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
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'done'],
      message: 'Status must be pending, in-progress, or done'
    },
    default: 'pending'
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


taskSchema.pre('save', function () {
  if (this.title) {
    this.title = this.title.trim().replace(/\s+/g, ' ');
  }
});

// Export the model
module.exports = mongoose.model('Task', taskSchema);

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  description: { type: String, required: true },
  date: { type: String, required: true },
  is_checked: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Todo', todoSchema);

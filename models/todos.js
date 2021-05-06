const mongoose = require('mongoose');

const Schema = mongoose.Schema;

todosSchema = new Schema({
  input: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Todos', todosSchema);

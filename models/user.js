const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  todos: {
    list: [
      {
        todoId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
  },
});
userSchema.methods.removeTodo = function (todo) {
  const updatedTodoList = this.todos.list.concat(todo);

  const updatedTodo = {
    list: updatedTodoList,
  };
  this.cart = updatedTodo;
  return this.save();
};
userSchema.methods.removeTodo = function (todo) {
  const updatedTodoList = this.todos.list.filter(todoItem => {
    return todoItem.todoId.toString() !== todo._id.toString();
  });

  const updatedTodo = {
    list: updatedTodoList,
  };
  this.cart = updatedTodo;
  return this.save();
};
module.exports = mongoose.model('User', userSchema);

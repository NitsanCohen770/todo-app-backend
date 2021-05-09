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
  todos: [],
});
userSchema.methods.addTodo = function (todo) {
  this.todos.push(todo);

  // const updatedTodo = {
  //   todo: updatedTodoList,
  // };
  // this.todo = updatedTodo;
  return this.save();
};
userSchema.methods.removeTodo = function (todoId) {
  const updatedTodoList = this.todos.filter(todoItem => {
    return todoItem.id !== todoId;
  });

  this.todos = [...updatedTodoList];
  return this.save();
};
userSchema.methods.editTodo = function (todoId, updateData) {
  const todoItemIndex = this.todo.findIndex(todo => {
    return todo.id === todoId;
  });

  this.todo[todoItemIndex].input = updateData.input;
  this.todo[todoItemIndex].priority = updateData.priority;

  return this.save();
};
module.exports = mongoose.model('User', userSchema);

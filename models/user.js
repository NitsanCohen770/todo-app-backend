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
userSchema.methods.addTodo = function (todo, editedTodoId) {
  if (editedTodoId) {
    const editedIndex = this.todos.findIndex(todo => todo.id === editedTodoId);
    // const updatedTodoList = [
    //   ...this.todos,
    //   (this.todos[editedIndex].input = todo.input),
    // ];

    this.todos[editedIndex].input = todo.input;
    // this.todos = [...updatedTodoList];
    return this.save();
  }
  this.todos.push(todo);

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

const User = require('../models/user');

exports.postAddTodo = (req, res, next) => {
  const id = req.body.id;
  const input = req.body.input;
  const priority = req.body.priority;
  const userId = req.body.userId;
  const editedTodoId = req.body.editedTodoId;
  console.log(editedTodoId);
  console.log(input);
  User.findById(userId).then(user => {
    user
      .addTodo({ id, input, priority }, editedTodoId)
      .then(response => {
        console.log(response);
        return res.end(JSON.stringify({ opration: 'Success' }));
      })
      .catch(err => console.log(err));
  });
};

exports.postDeleteTodo = (req, res, next) => {
  const id = req.body.id;
  const userId = req.body.userId;

  User.findById(userId).then(user => {
    user
      .removeTodo(id)
      .then(response => {
        console.log('he');
        return res.end(JSON.stringify({ opration: 'Success' }));
      })
      .catch(err => console.log(err));
  });
};

exports.getTodo = (req, res, next) => {
  console.log(req);
  const userId = req.body.userId;

  User.findById(userId)
    .then(user => {
      const todoList = user.todos;
      console.log(todoList);
      return res.send({ todoList });
    })
    .catch(err => console.log('error'));
};

exports.postEditTodo = (req, res, next) => {
  const id = req.body.id;
  const userId = req.body.userId;
  const updatedTodoData = req.body.updatedData;

  User.findById(userId).then(user => {
    return user
      .editTodo(id, updatedTodoData)
      .then(response => {
        res.status(202);
      })
      .catch(err => console.log(err));
  });
};

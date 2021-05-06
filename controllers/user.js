const Todos = require('../models/todos');

exports.postAddTodo = (req, res, next) => {
  const id = req.body.id;
  const input = req.body.input;
  const priority = req.body.priority;

  const todo = new Todos({
    input,
    priority,
    id,
    userId: req.user,
  });
  product
    .save()
    .then(result => {
      // console.log(result);

      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

'use strict';

// TODO: Write the homework code in this file
...
router.route('/create').post((req, res) => {
  var todo = new Todo(req.body);
  todo.save().then(todo => {
    res.status(200).json({ 'message': 'Todo successfully added ' });
  })
    .catch(err => {
      res.status(400).send("Error when saving to database");
    });
});

router.route('/todos').get((req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log(err);
    }
    else {
      res.json(todos);
    }
  });
});
router.route('/todos/:id').put((req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (!todo)
      return next(new Error('Error getting the todo!'));
    else {
      todo.name = req.body.name;
      todo.save().then(todo => {
        res.json('Todo updated successfully');
      })
        .catch(err => {
          res.status(400).send("Error when updating the todo");
        });
    }
  });
});
router.route('/todos/:id').get((req, res) => {
  Todo.findByIdAndRemove({ _id: req.params.id }, (err, todo) => {
    if (err) res.json(err);
    else res.json('Todo successfully removed');
  });
});

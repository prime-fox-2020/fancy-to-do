const {Todolist} = require('../models');

class TodoController {
  static addData(req, res, next) {
    const {title, description, status, due_date} = req.body;
    const UserId = req.userData.id;

    Todolist.create({
      title,
      description,
      status,
      due_date,
      UserId
    })
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      if (err.errors) {
        next(err);
      } else {
        next(err);
      }
    })
  }

  static getData(req, res, next) {
    Todolist.findAll({where: {UserId: req.userData.id}})
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
  }

  static getDataById(req, res, next) {
    Todolist.findOne({where: {id: req.params.id}})
    .then(data => {
      if (!data) {
        next({name: 'NotFound'});
      } else {
        res.status(200).json(data);
      }
    })
    .catch(err => {
      next(err);
    })
  }

  static editData(req, res, next) {
    const { title, description, status, due_date } = req.body;

    Todolist.update({
      title,
      description,
      status,
      due_date
    }, {
      where: {id: req.params.id}
    })
    .then(data => {
      if (data == 0) {
        next({name: 'NotFound'});
      } else {
        // res.send(data == 0);
        res.status(200).json({ title, description, status, due_date });
      }
    })
    .catch(err => {
      if (err.errors) {
        next(err);
      } else {
        next(err);
      }
    })
  }

  static delete(req, res, next) {
    Todolist.findOne({where: {id: req.params.id}})
    .then(data => {
      Todolist.destroy({where: {id: req.params.id}})
      .then(result => {
        if (!data) {
          next({name: 'NotFound'});
        } else {
          res.status(200).json(data);
        }
      })
      .catch(err => {
        next(err);
      })
    })
    .catch(err => {
      next(err);
    })
  }
}

module.exports = TodoController
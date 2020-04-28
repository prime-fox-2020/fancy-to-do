const {Todolist} = require('../models');

class TodoController {
  static addData(req, res) {
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
        res.status(400).json(err.errors);
      } else {
        res.status(500).json(err);
      }
    })
  }

  static getData(req, res) {
    Todolist.findAll({where: {UserId: req.userData.id}})
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json(err);
    });
  }

  static getDataById(req, res) {
    Todolist.findOne({where: {id: req.params.id}})
    .then(data => {
      if (!data) {
        res.status(404).json({error: 'Not found'});
      } else {
        res.status(200).json(data);
      }
    })
    .catch(err => {
      res.status(500);
    })
  }

  static editData(req, res) {
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
        res.status(404).json({error: 'Not Found'});
      } else {
        // res.send(data == 0);
        res.status(200).json({ title, description, status, due_date });
      }
    })
    .catch(err => {
      if (err.errors) {
        res.status(400).json(err.errors);
      } else {
        res.status(500).json(err);
      }
    })
  }

  static delete(req, res) {
    Todolist.findOne({where: {id: req.params.id}})
    .then(data => {
      Todolist.destroy({where: {id: req.params.id}})
      .then(result => {
        if (!data) {
          res.status(404).json({error: 'Not found'});
        } else {
          res.status(200).json(data);
        }
      })
      .catch(err => {
        res.status(500).json(err);
      })
    })
    .catch(err => {
      res.status(500).json(err);
    })
  }
}

module.exports = TodoController
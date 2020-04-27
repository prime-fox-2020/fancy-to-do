const {Todolist} = require('../models');

class TodoController {
  static addData(req, res) {
    const {title, description, status, due_date} = req.body;

    Todolist.create({
      title,
      description,
      status,
      due_date
    })
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      if (err.errors) {
        res.status(400).json(err.errors);
      } else {
        res.status(500).json(err)
      }
    })
  }

  static getData(req, res) {
    Todolist.findAll()
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
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500);
    })
  }

  static delete(req, res) {
    Todolist.destroy({where: {id: Number(req.params.id)}})
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
}

module.exports = TodoController
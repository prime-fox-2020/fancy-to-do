const express = require('express');
const router = express.Router();
const TM = require('../models').Todo;

class TodoController {
  static add(req, res){
    const {title, description, status, due_date} = req.body;

    //error validate belom
    //error message
    TM.create({title, description, status, due_date})
    .then((req, res) => {
      res.status(200).json()
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static show(req,res) {
    TM.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err)
      })
  }

//error message belom
  static findId(req, res) {
    TM.findByPk({where:{id: req.params.id}})
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(404).json(err)
    })
  }

//error validasi belom
//
  static update(req, res) {
    const {title, description, status, due_date} = req.body;

    TM.update({title, description, status, due_date}, {where: {id: Number(req.params.id)}})
    .then(() => {
      res.status(200).json()
    })
    .catch(err => {
      if (req.params.id != req.body.id) {
        res.status(404).json(err)
      }
      else {
        res.status(500).json(err)
      }
    })
  }

  static delete(req, res) {
    TM.destroy({where:{id: req.params.id}})
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      if (req.params.id != req.body.id) {
        res.status(404).json(err)
      }
      else {
        res.status(500).json(err)
      }
    })
  }

}

module.exports = TodoController;

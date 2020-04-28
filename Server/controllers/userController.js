require('dotenv').config();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  static register(req, res) {
    const { email, password } = req.body;

    User.create({
      email,
      password
    })
    .then(data => {
      const { id, email, password } = data;
      res.status(201).json({ id, email, password});
    })
    .catch(err => {
      if (err.errors) {
        res.status(400).json(err);
      }
      res.status(500).json({message: err.message || 'Internal Server Error'});
    })
  }

  static login(req, res) {
    const { email, password } = req.body;
    const errorMessage = {status: 400, message: 'invalid email / password'};

    User.findOne({
      where: {email}
    })
    .then(user => {
      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw errorMessage;
      }
      
      return user;
    })
    .then(user => {
      const { id, email } = user;
      const access_token = jwt.sign({id, email}, process.env.secretKey);
      res.status(201).json({ access_token });
    })
    .catch(err => {
      if (err.status) {
        res.status(400).json({message: 'Wrong Email / Password'});
      }
      res.status(500).json({message: err.message || 'Internal Server Error'})
    })
  }
}

module.exports = UserController;
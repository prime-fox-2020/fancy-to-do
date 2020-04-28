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
      res.status(400).json(err);
    })
  }

  static login(req, res) {
    const { email, password } = req.body;
    const secretKey = 'apaya';

    User.findOne({
      where: {email}
    })
    .then(data => {
      const { id, email } = data;
      if (bcrypt.compareSync(password, data.password)) {
        const access_token = jwt.sign({id, email}, secretKey);
        res.status(201).json({ access_token });
      } else {
        res.status(400).json({message: 'Wrong Email / Password'});
      }
    })
    .catch(err => {
      res.status(400).json({message: 'Wrong Email / Password'});
    })
  }
}

module.exports = UserController;
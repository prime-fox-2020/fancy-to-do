require('dotenv').config();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');

const CLIENT_ID = process.env.CLIENT_ID;

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

  static googleSignIn(req, res) {
    let userid = null;
    let thisEmail = null;
    const { idToken } = req.body;
    const client = new OAuth2Client(CLIENT_ID);
    client.verifyIdToken({
      idToken,
      audience: CLIENT_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload();
      userid = payload['sub'];
      thisEmail = payload['email'];
      
      return User.findOne({where: { email: thisEmail }})
    })
    .then(user => {
      if (user) {
        const { id, email } = user;
        const access_token = jwt.sign({id, email}, process.env.secretKey);
        res.status(201).json({ access_token });
      } else {
        return User.create({
          email: thisEmail,
          password: userid
        })
      }
    })
    .then(newUser => {
      const { id, email } = newUser;
      const access_token = jwt.sign({id, email}, process.env.secretKey);
      res.status(201).json({ access_token });
    })
    .catch(err => {
      console.log(err);
    })
  }
}

module.exports = UserController;
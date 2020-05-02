require('dotenv').config();
const { User } = require('../models');
const {OAuth2Client} = require('google-auth-library');
const generateToken = require('../helpers/generateToken');
const comparePassword = require('../helpers/comparePassword');

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
      if (!user || !comparePassword(password, user)) {
        throw errorMessage;
      }
      
      return user;
    })
    .then(user => {
      const access_token = generateToken(user);
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
    let access_token = null;
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
        access_token = generateToken(user);
        res.status(201).json({ access_token });
      } else {
        return User.create({
          email: thisEmail,
          password: userid
        })
      }
    })
    .then(() => {
      if (!access_token) {
        const user = {id: null, email: thisEmail}
        access_token = generateToken(user);
        res.status(201).json({ access_token });
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
}

module.exports = UserController;
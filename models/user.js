'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 2;

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;
  class User extends Model {}
  User.init({
    name: {
      type: DataTypes.STRING,
      // validate: {
      //   notEmpty: {msg: "Name must not empty"}
      // }
    },
    email:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "Email must not empty"}
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "Password must not empty"}
      }
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = bcrypt.hashSync(user.password, saltRounds);
      }
    },
    sequelize})

  User.associate = function(models) {
    User.hasMany(models.Todo);
  };

  return User;
};
'use strict';
const { generateHashedPassword } = require('../helpers/crypt')

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model {}

  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please fill your name`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        unique: {
          msg: `This email is already taken. Please use another email`
        },
        isEmail: {
          msg: `Please enter the correct email address`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please fill your password`
        }
      }
    }
  }, { sequelize })

  User.beforeCreate((user, option) => {
    user.password = generateHashedPassword(user.password)
  })

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo);
  };
  return User;
};
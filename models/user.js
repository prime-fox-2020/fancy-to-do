'use strict';
const { generateHashedPassword } = require('../helpers/crypt')
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model {}

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please fill your name`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: `Email is already in use. Please use another email`
      },
      validate: {
        isEmail: {
          msg: `Please enter the correct email address`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
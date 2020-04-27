'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  const { generatePassword } = require('../helpers/bcrypt')

  class User extends Model {

  }

  User.init({
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: new Error('Username harus terisi')
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: new Error('Email tidak boleh kosong')
        }
      },
      unique: {
        args: true,
        msg: 'Email telah digunakan'
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: new Error('Password tidak boleh kosong')
        }
      }
    }
  }, {
    sequelize
  });

  User.beforeCreate((user) => {
    user.password = generatePassword(user.password)
  })

  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
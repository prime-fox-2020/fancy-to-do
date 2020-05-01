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
      unique: {
        args: true,
        msg: `Email is already in use. Please use another email`
      },
      validate: {
        isEmail: {
          msg: `Please enter the correct email address`
        }
        // isUnique: function(value, next) {
        //   User.findAll({
        //     where: { email: value }
        //   }).done((data) => {
        //     if (data){
        //       throw { messages: [`Email is already in use. Please use another email`], statusCode: 400 }
        //     }
        //     next()
        //   })
        // }
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
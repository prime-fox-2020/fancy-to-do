'use strict';
const bcrypt = require('bcrypt')
const saltRounds = 2

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class User extends Model{}
  User.init({
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email is required"
        },
        isEmail : {
          msg: "Format email must be correct"
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg: "Password is required"
        }
      }
    }
  }, { sequelize });
  User.associate = function(models) {
    // associations can be defined here
  };
  User.beforeCreate( (instance, options) => {
    const hash = bcrypt.hashSync(instance.password, saltRounds)
    instance.password = hash
  })
  return User;
};
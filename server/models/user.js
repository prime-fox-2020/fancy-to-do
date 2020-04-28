'use strict';

const { hashPassword } = require('../helpers/hashPassword');

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model { }

  User.init({
    name: DataTypes.STRING,
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email is required"
        },
        isEmail : {
          msg: "Wrong format email"
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg: "Password is required"
        }
      }
    }
  }, { sequelize });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo);
  };
  User.beforeCreate( (instance, options) => {
    const hash = hashPassword(instance.password)
    instance.password = hash
  })
  return User;
};
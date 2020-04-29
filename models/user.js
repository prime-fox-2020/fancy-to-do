'use strict';
const bcrypt = require('bcrypt'), saltRounds = 2;

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model{}

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Input email'
        }
      }
    }, 
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Input Password'
        }
      }
    } 
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.password = bcrypt.hashSync(instance.password, saltRounds);
      }
    }
  ,sequelize});
  User.associate = function(models) {
    User.hasMany(models.Todo)
    // associations can be defined here
  };
  return User;
};
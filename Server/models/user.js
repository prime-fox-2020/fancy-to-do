'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please fill email'
        },
        isEmail: {
          msg: 'Wrong email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please fill password'
        }
      }
    }
  }, { sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        return bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
        })
        .catch(err => { 
            throw new Error(); 
        });
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todolist);
  };
  return User;
};
'use strict';
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {

  }
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please input your email'  
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: 'Please input your password'
      }
    }
  }, {
    sequelize
  });

  User.beforeCreate((instance, options) => {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(instance.password, salt)
    instance.password = hash
  })

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};
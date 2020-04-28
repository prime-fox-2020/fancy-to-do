'use strict';
const { generatePassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  
  class User extends Model{

  }

  User.init({
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Email is required' }
      },
      unique: {
        args: true,
        msg: 'Email already in use!'
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password is required' }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user)=>{
        user.password = generatePassword(user.password)
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};
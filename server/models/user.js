'use strict';

const { hashPwd } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'email is null'
        },
        notEmpty: {
          msg: 'email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'password is null'
        },
        notEmpty: {
          msg: 'password cannot be empty'
        }
      }
    }
  },{
    hooks: {
      beforeCreate(user, option){
        user.password = hashPwd(user.password)
      }
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Todo)
  };
  return User;
};
'use strict';

const { hashPwd } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'title is null'
        },
        notEmpty: {
          msg: 'title cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'title is null'
        },
        notEmpty: {
          msg: 'title cannot be empty'
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
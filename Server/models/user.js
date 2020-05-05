'use strict';
module.exports = (sequelize, DataTypes) => {
  const bcrypt = require('bcrypt')
  const salt = 2
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks :{
      beforeCreate(User){
        User.password = bcrypt.hashSync(User.password, salt)
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.todo)
  };
  return User;
};
'use strict';
const {generatePassword} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model {}

  User.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {sequelize});

  User.beforeCreate((user, options) => {
    user.password = generatePassword(user.password)
  });
  
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};
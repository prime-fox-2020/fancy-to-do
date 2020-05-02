'use strict';
const brcypt = require('bcrypt')
const saltRounds = 2

module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model {}

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate(user, options) {
        console.log({userPassword: user.password})
        user.password = brcypt.hashSync(user.password, saltRounds) 
      }
    }
  });

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };

  return User;
};
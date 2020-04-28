'use strict';
const brcypt = require('bcrypt')
const saltRounds = 2

module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks : {
      beforeCreate(user) {
        user.password = brcypt.hashSync(user.password, saltRounds) 
      }
    }
  }, sequelize);
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};
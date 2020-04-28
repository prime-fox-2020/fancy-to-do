'use strict';
const hashPassword = require('../helpers/hashPassword')
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model {

  }

  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        let hashed = hashPassword(instance.password)
        instance.password = hashed
      }
    }, sequelize
  });

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};
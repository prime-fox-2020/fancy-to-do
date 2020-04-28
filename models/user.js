'use strict';
const bcrypt = require('bcryptjs')
const saltRounds = 2

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model {

  }
  
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user){
        user.password = bcrypt.hashSync(user.password, saltRounds)
      }
    },
    sequelize
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
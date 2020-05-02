'use strict';
const bcrypt = require('bcryptjs')
const saltRounds = 2
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model{}

  User.init({
    email: DataTypes.STRING,
    pass: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user){
        const hash = bcrypt.hashSync(user.pass, saltRounds)
        user.pass = hash
      }
    },
    sequelize});
  User.associate = function(models) {
    User.hasMany(models.Todo)
  };
  return User;
};
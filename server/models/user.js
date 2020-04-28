'use strict';

const bcrypt = require('bcrypt')              // jwt proced
const saltRounds = 2                          // jwt proced

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model { }

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, { 
    hooks: {                                  // jwt proced
      beforeCreate(user){
        const hash = bcrypt.hashSync(user.password, saltRounds)
        user.password = hash
      }
    },
    sequelize
  });
  
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};
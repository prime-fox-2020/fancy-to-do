'use strict';
const bcrypt = require('bcrypt')
const saltRounds = 2

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Email must be filled!"
        },
        isEmail : {
          msg : "Email must be an email format!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "pwd must be fiiled!"
        }
      }
    }
  }, {
    hooks : {
      beforeCreate(user){
        user.password = bcrypt.hashSync(user.password, saltRounds)
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};
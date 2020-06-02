'use strict';
const {generatePassword} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class User extends Model {}
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Nama tidak boleh kosong"
        }
      }
    },
    username: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Username tidak boleh kosong"
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Email tidak boleh kosong"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password tidak boleh kosong"
        }
      }
    }
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
'use strict';
const {hashPassword} = require('../helpers')

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model {}

  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: 'First name cannot be empty'
        }
      }
    },
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: 'Email cannot be empty'
        },
        isEmail: {
          msg: 'Your email input is not valid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: 'Password cannot be empty'
        },
        len: {
          args: [5, 8],
          msg: 'Password must be 5-8 characters long'
        }
      }
    },
  }, {sequelize});

  User.associate = function(models) {
    User.hasMany(models.Todo)
  };

  User.beforeCreate( (instance, options) => {
    const hash = hashPassword(instance.password)
    instance.password = hash
  })

  return User;
};
'use strict';
const {hashPassword} = require('../helpers/hashPassword')

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class User extends Model{}
  User.init({
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email is required"
        },
        isEmail : {
          msg: "Format email must be correct"
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg: "Password is required"
        }
      }
    }
  }, { sequelize });
  User.associate = function(models) {
    User.hasMany(models.Todo)
  };
  User.beforeCreate( (instance, options) => {
    const hash = hashPassword(instance.password)
    instance.password = hash
  })
  return User;
};
'use strict';
const { crypting } = require('../helper/bcrypting')

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model     = Sequelize.Model
  class User extends Model {}
  User.init ({
    email: {
      type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args : true,
          msg: 'Email already exist'
        },
        validate: {
          notEmpty: {
            args: true,
            msg: 'Invalid Email format.'
          },
          notNull: {
            args: true,
            msg: 'Email is required field.'
          }
        }
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    hooks:{
      beforeCreate(user){
        console.log('hello hooks')
        user.password = crypting(user)
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};
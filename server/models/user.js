'use strict';
const bcrypt = require('bcrypt')
const saltRounds = 2

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model{

  }
  
  User.init({
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email is Required"
        },
        isEmail : {
          msg: "Invalid Email Format"
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg: "Password is required"
        },
        notEmpty:{
          msg: 'Password is required'
        }
      }
    }
  }, { sequelize });

  User.beforeCreate((instance,option)=>{
    let hash = bcrypt.hashSync(instance.password, saltRounds)
    instance.password = hash
  })

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};
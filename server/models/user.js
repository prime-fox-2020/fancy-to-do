'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  const { generatePassword } = require('../helper/bcrypt')
  class User extends Model {}
  User.init ({
    name : {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : `Name Section is Empty`
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : `Email Section is Empty`
        },
        isEmail : true
      }
    },
    password: {
      type:DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : `Password Section is Empty`
        }
      }
    }
  }, { sequelize });

  User.beforeCreate((instance,options) => {
    if(!instance.password){
      throw new Error(`Password Section is Empty`)
    } else {
      const hash = generatePassword(instance.password)
      instance.password = hash
    }
  })
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
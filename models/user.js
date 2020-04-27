'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  const { generatePassword } = require('../helper/bcrypt')
  class User extends Model {}
  User.init ({
    email: {
      type:DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : `Email Section is Empty`
        },
        isEmail : true
      }
    },
    password: DataTypes.STRING
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
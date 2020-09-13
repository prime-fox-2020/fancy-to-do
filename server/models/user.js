'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const Sequelize=sequelize.Sequelize
  const Model=Sequelize.Model

  class User extends Model{}
  User.init({
    email: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Email is required'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Password is required'
        }
      }
    }
    // email: DataTypes.STRING,
    // password: DataTypes.STRING
  }, {sequelize});

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Project)
  };

  User.beforeCreate((instance,options)=>{
    const hash=bcrypt.hashSync(instance.password,saltRounds)
    instance.password=hash
  })


  return User;
};
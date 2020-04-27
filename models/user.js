'use strict';
const bcrypt = require('bcrypt')
const saltRounds = 2
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model{}

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  },{hooks : {
    beforeCreate(user){
      const hash = bcrypt.hashSync(user.password,saltRounds)
      user.password = hash
    }
  },sequelize})
  // ,{
  //   hooks: {
  //     beforeCreate(user){
  //       const hash = bcrypt.hashSync(user.password, saltRounds)
  //       user.password = hash
  //     }  
  // , sequelize}})
  // const User = sequelize.define('User', {
  // }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
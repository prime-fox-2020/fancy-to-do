'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model
  
  class User extends Model{
    
  }
  
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.INTEGER
  }, {sequelize});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
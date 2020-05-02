'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Project_User extends Model{}
  
  Project_User.init({
    ProjectId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, { sequelize });
  Project_User.associate = function(models) {
    // associations can be defined here
  };
  return Project_User;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class FancyToDo extends Model {}

  FancyToDo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: DataTypes.DATE
  }, { sequelize });


  FancyToDo.associate = function(models) {
    // associations can be defined here
  };
  return FancyToDo;
};
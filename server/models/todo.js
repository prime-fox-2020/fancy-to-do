'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model
  
  class Todo extends Model{
    
  }
  
  
  Todo.init({
    username:DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: DataTypes.STRING
  }, {sequelize});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};
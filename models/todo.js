'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define('todo', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: DataTypes.DATEONLY
  }, {});
  todo.associate = function(models) {
    // associations can be defined here
  };
  return todo;
};
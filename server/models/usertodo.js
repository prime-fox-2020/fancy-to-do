'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserTodo = sequelize.define('UserTodo', {
    UserId: DataTypes.INTEGER,
    TodoId: DataTypes.INTEGER,
    project: DataTypes.STRING
  }, {});
  UserTodo.associate = function(models) {
    UserTodo.belongsTo(models.User)
    UserTodo.belongsTo(models.Todo)
  };
  return UserTodo;
};
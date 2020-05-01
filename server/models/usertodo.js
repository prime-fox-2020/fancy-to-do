'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserTodo = sequelize.define('UserTodo', {
    UserId: DataTypes.INTEGER,
    TodoId: DataTypes.INTEGER,
    project: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          msg: 'project name cannot be empty'
        }
      }
    }
  }, {});
  UserTodo.associate = function(models) {
    UserTodo.belongsTo(models.User)
    UserTodo.belongsTo(models.Todo)
  };
  return UserTodo;
};
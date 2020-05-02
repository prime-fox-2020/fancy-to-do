'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;
  class Todo extends Model {}
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: DataTypes.DATEONLY,
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(todo) {
        todo.status = 'incomplete';
      }
    }, sequelize})

  Todo.associate = function(models) {
    Todo.belongsTo(models.User);
  };
  return Todo;
};
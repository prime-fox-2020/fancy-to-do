'use strict';
const { getUserData } = require('../helpers/token')

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Todo extends Model {}

  Todo.init({
    title: {
      type: DataTypes.STRING,
      notEmpty: {
        args: true,
        msg: `Title can't be empty`
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      notEmpty: {
        args: true,
        msg: `Status can't be empty`
      }
    },
    due_date: {
      type: DataTypes.STRING,
      notEmpty: {
        args: true,
        msg: `Due date can't be empty`
      }
    },
    UserId: DataTypes.INTEGER
  }, { sequelize })

  Todo.beforeCreate((todo, options) => {
    const { access_token } = req.headers
    todo.UserId = getUserData(access_token).id
  });

  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};
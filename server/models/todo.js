'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'title is null'
        },
        notEmpty: {
          msg: 'title cannot be empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: 'description cannot be empty'
        },
        notNull: {
          msg: 'description is null'
        }
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: 'status cannot be empty'
        },
        notNull: {
          msg: 'status is null'
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: 'due date cannot be empty'
        },
        notNull: {
          msg: 'due date is null'
        },
        isDate: {
          msg: 'date type invalid'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'userId is null'
        },
        notEmpty: {
          msg: 'userId cannot be empty'
        }
      }
    }
  }, {});
  Todo.associate = function(models) {
    Todo.belongsTo(models.User)
  };
  return Todo;
};
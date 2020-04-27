'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Input title'
        }
      }
    }, 
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Input description'
        }
      }
    }, 
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: 'Wrong date format, right format :(yyyy-mm-dd) or (yyyy/mm/dd)'
        }
      }
    } 
  }, {
    hooks: {
      beforeCreate: (instance, option) => {
        instance.status = false;
      }
    }
  });
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};
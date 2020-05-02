'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Todo extends Model{}

  Todo.init({
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
    },
    UserId: DataTypes.INTEGER 
  }, {
    hooks: {
      beforeCreate: (instance, option) => {
        instance.status = false;
      }
    }
  ,sequelize});
  Todo.associate = function(models) {
    Todo.belongsTo(models.User);
    // associations can be defined here
  };
  return Todo;
};
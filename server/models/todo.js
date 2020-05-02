'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model  = sequelize.Sequelize.Model
  class Todo extends Model {

  }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Description cannot be empty'
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty : {
          msg: 'Date cannot be empty'
        },
        isDate: {
          msg: 'Date format must DD-MM-YYYY'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize
  });
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};
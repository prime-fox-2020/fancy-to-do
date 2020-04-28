'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Todo extends Model{}

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'title cannot be empty'
        }       
      }
    },
    desc: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'description cannot be empty'
        }       
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate:{
        notEmpty:{
          msg: 'status cannot be empty'
        }       
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate:{
        notEmpty:{
          msg: 'due date cannot be empty'
        }       
      }
    },
    UserId: DataTypes.INTEGER
  }, {sequelize});
  Todo.associate = function(models) {
    Todo.belongsTo(models.User)
  };
  return Todo;
};
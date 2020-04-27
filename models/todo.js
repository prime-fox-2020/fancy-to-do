'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Todo extends Model{}
  
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : `Your Task is Empty`
        }
      }
    },
    description: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : `Your Task Description is Empty`
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type : DataTypes.DATEONLY,
      validate : {
        notEmpty : {
          msg : `Date Is Empty`
        }
        // , isAfter :{
        //   args : [new Date()],
        //   msg : `Your Due Date cannot before today`
        // }
      }
    }
  }, { sequelize });
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Title must filled!"
        }
      }    
    },
    description: {
      type: DataTypes.STRING,
      validate :{
        notEmpty : {
          msg : "Title must filled!"
          
        }
      }
    },
    status: DataTypes.STRING,
    due_date: {
      type:DataTypes.DATE,
      validate :{
        notEmpty:{
          msg : "Date must filled!"
        },
        isAfter: {
          args: String(new Date()),
          msg: "Must choose date today or next"
        }
      }
    }
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
};
  return Todo;
};
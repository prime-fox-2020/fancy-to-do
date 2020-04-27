'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Todo extends Model { }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please do not leave empty title' 
        }
        // ,notNull: {
        //   msg: 'Please do not leave title null' 
        // }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please do not leave empty description' 
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please do not leave empty status' 
        }
      }
    },
    due_date: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please do not leave empty due_date' 
        }
      }
    }
  }, { sequelize });
  
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};
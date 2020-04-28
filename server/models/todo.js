'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Todo extends Model { }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please do not leave empty title' 
        },
        notNull: {
          msg: 'Please do not leave title null' 
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please do not leave empty description' 
        },
        notNull: {
          msg: 'Please do not leave description null' 
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please do not leave empty status' 
        },
        notNull: {
          msg: 'Please do not leave status null' 
        }
      }
    },
    due_date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please do not leave empty due_date' 
        },
        notNull: {
          msg: 'Please do not leave due date null' 
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, { sequelize });
  
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};
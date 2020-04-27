'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model     = Sequelize.Model
  class Todo extends Model {}
  Todo.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: 'title cannot be empty'
        },
        notNull:{
          msg: 'title cannot be empty'
        }
      }
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: 'description cannot be empty'
        },
        notNull:{
          msg: 'description cannot be empty'
        }
      }
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: 'status cannot be empty'
        },
        notNull:{
          msg: 'status cannot be empty'
        }
      }
    },
    due_date: DataTypes.DATE
  }, {sequelize});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};
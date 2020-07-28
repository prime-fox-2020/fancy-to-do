'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Todo extends Model {}

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg : 'Title is required'
        }
      }
    },
    description:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg : 'Description is required'
        }
      }
    },
    status:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg : 'Status is required'
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
          isDate: {
            msg: 'Wrong Date Format'
          }
      }
    },
    UserId: DataTypes.INTEGER
  }, {sequelize});
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};
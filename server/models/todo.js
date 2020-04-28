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
          msg : 'Title cannot be empty'
        }
      }
    },
    description:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg : 'Description cannot be empty'
        }
      }
    },
    status:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg : 'Status cannot be empty'
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
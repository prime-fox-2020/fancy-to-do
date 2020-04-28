'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Todo extends Model {}

  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: 'Title cannot be empty'
        }
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'completed', 'pastdue'],
      validate: {
        isIn: {
          args: [['active', 'completed', 'pastdue']],
          msg: "Status must be active, completed or pastdue"
        },
        pastDueOrCompleted(value) {
          let dueDate = new Date(this.due_date)

          if (dueDate > new Date() && value === 'pastdue') {
            throw new Error('Change your due date or todo status')
          }
          if (dueDate < new Date() && value === 'active') {
            throw new Error('Change your due date or todo status')
          }
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: 'Due date cannot be empty'
        },
        isDate: {
          msg: 'Correct date format is YYYY-MM-DD'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: 'UserId cannot be empty'
        }
      }
    },
  }, {
    sequelize,
    paranoid: true,
  });

  Todo.associate = function(models) {
    Todo.belongsTo(models.User)
  };
  
  return Todo;
};
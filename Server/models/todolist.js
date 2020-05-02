'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Todolist extends Model {}

  Todolist.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please fill title'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please fill description'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please fill status'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'Please fill due date'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {sequelize});
  Todolist.associate = function(models) {
    // associations can be defined here
    Todolist.belongsTo(models.User);
  };
  return Todolist;
};
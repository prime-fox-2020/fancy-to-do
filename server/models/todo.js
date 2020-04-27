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
          msg: 'Namanya isi'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Deskripsinya isi'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate:{
        notEmpty:{
          msg: 'Statusnya isi'
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate:{
        notEmpty:{
          msg: 'Due date isi'
        }
      }
    }
  }, {sequelize});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};
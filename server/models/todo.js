'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  
  class Todo extends Model {

  }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "title gak boleh kosong"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "description gak boleh kosong"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "status gak boleh kosong"
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: "due date gak boleh kosong"
        }
      }
    },
  }, {sequelize});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};
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
          msg: "Title tidak boleh kosong"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Description tidak boleh kosong"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Status tidak boleh kosong"
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: "Due date tidak boleh kosong"
        },
        isDate: {
          args: true,
          msg: "Tanggal tidak valid!!! contoh yang benar (1999-01-01)"
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
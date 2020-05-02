'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Todo extends Model {}

  Todo.init({
    title: {
      type: Sequelize.STRING,
      validate : {
        notEmpty : {
          msg: 'Title is Empty!'
        }
      }
    },
    description: {
      type : Sequelize.STRING,
      validate : {
        notEmpty : {
          msg: 'Description is Empty!'
        }
      }
    }
    ,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: Sequelize.DATEONLY,
      validate: {
        notEmpty: {
          msg:'Format Date YYYY-MM-DD!'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {sequelize});
  Todo.associate = function(models) {
    Todo.belongsTo(models.User)
  };
  return Todo;
};

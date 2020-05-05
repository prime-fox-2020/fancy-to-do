'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Todo extends Model { }

  Todo.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title is required'
        },
      }
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description is required'
        },
      }
    },
    status: DataTypes.STRING,
    due_date: DataTypes.DATEONLY
  }, { sequelize });
  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};
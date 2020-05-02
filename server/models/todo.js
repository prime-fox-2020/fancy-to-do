'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Todo extends Model {

  }


  Todo.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Title is required' }
      }
    },
    description:{
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Description is required' }
      }
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Status is required' }
      }
    },
    due_date: DataTypes.DATEONLY,
    UserId : DataTypes.INTEGER
  }, {sequelize});
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};
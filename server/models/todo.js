'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Todo extends Model{}

  Todo.init({
    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Title todos is required'
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: DataTypes.DATE
  }, { sequelize });
  Todo.associate = function(models) {
    // associations can be defined here
  };
  Todo.beforeCreate( (instance, option) => {
    if(instance.status === null){
      instance.status = false
    }
  })
  return Todo;
};
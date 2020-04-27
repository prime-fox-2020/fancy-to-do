'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Todo extends Model{  }

  Todo.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title todos is required'
        },
        notNull: {
          msg: 'Title todos is required'
        },
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: Sequelize.DATE,
      notNull: {
        msg: 'Due date is required'
      }
    }
  }, { sequelize });
  Todo.associate = function(models) {
    // associations can be defined here
  };
  Todo.beforeCreate( (instance, option) => {
    if(instance.status == null){
      instance.status = false
    }
  })
  return Todo;
};
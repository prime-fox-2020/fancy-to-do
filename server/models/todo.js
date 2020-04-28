'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Todo extends Model{}

  Todo.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title is required'
        },
        notNull: {
          msg: 'Title is required'
        },
      }
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description is required'
        },
        notNull: {
          msg: 'Description is required'
        },
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type: Sequelize.DATE,
      allowNull: true,
      validate: {
        customNull(value){
          if(value == null || value.length === 0){
            throw new Error('Due date is required')
          }
        },
        validateDate(value){
          if(value != null){
            const date = new Date().getTime()
            const inputDate = value.getTime()
            if(inputDate < date){
              throw new Error('Invalid due date')
            }
          }
        }
      }
    }
  }, { sequelize });
  Todo.associate = function(models) {
    Todo.belongsTo(models.User)
  };
  Todo.beforeCreate( (instance, options) => {
    if(instance.status == null){
      instance.status = false
    }
  })
  Todo.beforeDestroy( (instance, options) => {
    options.individualHooks = true;
    instance.obj = {
      title : instance.title,
      description : instance.description,
      status : instance.status,
      due_date : instance.due_date
    }
    console.log(instance.obj)
  })
  return Todo;
};
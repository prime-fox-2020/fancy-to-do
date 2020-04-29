'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Todo extends Model{
    
  }
  
  Todo.init({
    title: { 
    type: DataTypes.STRING,
    validate:{
      notEmpty:{
        msg:'Tittle Required'
        }
      }
    },
    description:  { 
    type: DataTypes.STRING,
    validate:{
      notEmpty:{
        msg:'Description Required'
          }
        }
      },
    status:  { 
    type: DataTypes.STRING,
    validate:{
      notEmpty:{
        msg:'Status Required'
        }
      }
    },
    due_date:  { 
    type: DataTypes.DATE,
    validate:{
      notEmpty:{
        msg:'due date Required'
        },
        isDate: {
          msg: 'due_date Format is YYYY-MM-DD'
        }
      }
    }
  }, { sequelize });
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};
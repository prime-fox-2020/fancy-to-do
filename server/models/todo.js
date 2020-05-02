'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model 

  class Todo extends Model {}
  
  Todo.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg :'please enter the title'
        }
      }
    },
    description: {
      type : DataTypes.STRING,
      allowNull :false,
      validate:{
        notNull:{
          msg:'please enter the description'
        }
      }
    },
    status: {
      type : DataTypes.STRING,
      allowNull :false,
      validate:{
        notNull:{
          msg:'please enter status'
        }
      }
    },
    due_date: {
      type : DataTypes.DATE,
      allowNull :false,
      validate:{
        notNull:{
          msg:'please enter the description'
        }
      }
    },
    UserId : DataTypes.INTEGER
  }, {sequelize});
  
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};
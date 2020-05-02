'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  
  class Todo extends Model {}
  Todo.init({
    title: {
      type : DataTypes.STRING,
      validate : {notEmpty :{
        args : true,
        msg : 'Fill in Title!'
      }}
    },
    description: {
      type: DataTypes.STRING,
      validate: {notEmpty :{
        args : true,
        msg:'Fill in Description'
      }}
    },
    status:{
      type: DataTypes.BOOLEAN,
      validate:{notEmpty:{
        args : true,
        msg:'Fill in Status!'
      }}
    },
    due_date:{
      type:DataTypes.DATE,      
      validate: {notEmpty : {
        args : true,
        msg: 'Fill in Date!'
      },isDate:{
        msg: 'Follow Date Format!'
      }}
    }
  },{sequelize})


  // const Todo = sequelize.define('Todo', {
  // }, {});
  Todo.associate = function(models) {
    Todo.belongsTo(models.User)
    // associations can be defined here
  };
  return Todo;
};
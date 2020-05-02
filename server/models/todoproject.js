'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class TodoProject extends Model{}
  TodoProject.init({
    title: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, { sequelize });
  TodoProject.associate = function(models) {
    TodoProject.belongsTo(models.Project)
    // associations can be defined here
  };
  TodoProject.beforeCreate( (instance, options) => {
    if(instance.status == null){
      instance.status = false
    }
  })
  return TodoProject;
};
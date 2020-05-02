'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Project extends Model{}
  Project.init({
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name is required'
        },
        notNull: {
          msg: 'Name is required'
        },
      }
    },
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
          if(value && value != null){
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
  Project.associate = function(models) {
    Project.hasMany(models.TodoProject)
    Project.belongsToMany(models.User, { through: models.Project_User })
  };
  return Project;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize=sequelize.Sequelize
  const Model=Sequelize.Model

  class Project extends Model{}

  Project.init({
    title: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Title is required'
        }
      }
    },
    description: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Description is required'
        }
      }
    },
    status: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Status is required'
        }
      }
    },
    due_date: {
      type:DataTypes.DATEONLY,
      validate:{
        notEmpty:{
          msg:'Date is required'
        }
      }
    }
    // description: DataTypes.STRING,
    // status: DataTypes.STRING,
    // due_date: DataTypes.DATEONLY
  }, {sequelize});

  Project.associate = function(models) {
    // associations can be defined here
  };

  return Project;
};
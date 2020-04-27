'use strict';
module.exports = (sequelize, DataTypes) => {
  const ToDo = sequelize.define('ToDo', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: DataTypes.DATEONLY
  }, {});
  ToDo.associate = function(models) {
    // associations can be defined here
  };
  return ToDo;
};
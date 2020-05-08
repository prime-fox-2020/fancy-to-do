'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class ToDo extends Model {

  }

  ToDo.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: new Error('Title tidak boleh kosong')
        }
      }
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: new Error('Descripption harus diisi')
        }
      }
    },
    status: DataTypes.STRING,
    due_date: DataTypes.DATEONLY,
    UserId: DataTypes.INTEGER
  }, { sequelize });

  ToDo.associate = function (models) {
    // associations can be defined here
    ToDo.belongsTo(models.User)
  };
  return ToDo;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class FancyToDo extends Model {}

  FancyToDo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'kolom title tidak boleh kosong'
        },
        notEmpty: {
          msg: 'kolom title tidak boleh kosong'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'kolom description tidak boleh kosong'
        },
        notEmpty: {
          msg: 'kolom description tidak boleh kosong'
        }
      }
    },
    status: DataTypes.STRING,
    due_date: DataTypes.DATE
  }, { sequelize });


  FancyToDo.associate = function(models) {
    // associations can be defined here
    FancyToDo.belongsTo(models.User)
  };
  return FancyToDo;
};
'use strict';
const bcrypt = require('bcrypt')
const saltRounds = 3

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model { }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'kolom email tidak terisi'
        },
        notEmpty: {
          msg: 'kolom email tidak boleh kosong'
        }
      },
      unique: {
        args: true,
        msg: 'Email address already in use!'
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'kolom password tidak terisi'
        },
        notEmpty: {
          msg: 'kolom password tidak boleh kosong'
        }
      }
    }
  }, { sequelize });

  User.beforeCreate((user, options) => {
    const hash = bcrypt.hashSync(user.password, saltRounds);
    user.password = hash
  })

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.FancyToDo)
  };
  return User;
};
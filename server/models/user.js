"use strict";
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;
  const bcrypt = require("../helper/hashPass");
  // const bcrypt = require('bcrypt')
  class User extends Model {}

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Name required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Email required",
          },
          isEmail(value) {
            if (value.indexOf("@") == -1 && value !== "") {
              console.log(typeof value);
              throw new Error("Invalid Email format");
            }
          },
          duplicate(value) {
            return User.findAll({
              where: {
                email: value,
              },
            }).then((ada) => {
				
              if (ada.length != 0) {
                throw new Error("This email is already taken, try another");
              }
            })
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Password required",
          },
        },
      },
    },
    { sequelize }
  );

  User.beforeCreate((instance, option) => {
    let hash = bcrypt(instance);
    instance.password = hash;
    console.log(instance.password);
    // var salt = bcrypt.genSaltSync(10);
    // var hash = bcrypt.hashSync(instance.password, salt);
    // instance.dataValues.password = hash
  });

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Todo);
  };
  return User;
};

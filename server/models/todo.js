"use strict";
module.exports = (sequelize, DataTypes) => {
  let tanggal = new Date().toLocaleDateString().split("/").reverse().join("-");
  let arr = [];
  let str = "";

  for (let i = tanggal.length - 1; i >= 0; i--) {
    str += tanggal[i];
    if (i == 5) {
      arr.push(str);
    }
  }

  let gabung = arr.join();
  let penentu = `${tanggal.substr(0, 4)}-${gabung}`;

  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Todo extends Model {}

  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Title required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Description required",
          },
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        validate: {
          notEmpty: {
            msg: "Status required",
          },
          isBoolen(value) {
            let counter = 0;
            let arr = ["true", true, "false", false];
            for (let i = 0; i < arr.length; i++) {
              if (value == arr[i]) {
                counter++;
              }
            }
            if (counter == 0) {
              throw new Error("Status has to be true or false");
            }
          },
        },
      },
      due_date: {
        type: DataTypes.DATEONLY,
        validate: {
          notEmpty: {
            msg: "Due date required",
          },
          isDate: {
            msg: "Due date format has to be YYYY-MM-DD",
          },
          isAfter: {
            args: [penentu],
            msg: "You date has already passed",
          },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    { sequelize }
  );
  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.User);
  };
  return Todo;
};

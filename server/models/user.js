'use strict';
const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model {}

  User.init({
    email:{
      type:Sequelize.STRING,
      validate : {
        notEmpty :{
          msg:'Email is Empty!'
        }
      }
    },
  password:{
    type:Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: 'Password is Empty!'
      }
    }
  }
},
{
  hooks: {
    beforeCreate(user){
      const hash = bcrypt.hashSync(user.password, saltRounds);
      user.password = hash;
    }
},
sequelize});
  User.associate = function(models) {
    User.hasMany(models.Todo)
  };
  return User;
};

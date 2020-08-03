'use strict';
const bcrypt = require('bcrypt')
const saltRounds = 2


module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model
  
  class User extends Model{
    
  }
  
  User.init({
    first_name: {
      type : DataTypes.STRING,
      validate:{
        isLength(value){
          if(value.split('').length<3){
            throw new Error('at least 3 characters')
          }
        }
      }
    },
    last_name: {
      type : DataTypes.STRING,
      validate:{
        isLength(value){
          if(value.split('').length<3){
            throw new Error('at least 3 characters')
          }
        }
      }
    },
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate(body){
        console.log(body.password)
        const hash = bcrypt.hashSync(body.password,saltRounds)
        body.password = hash
      }
    },
    sequelize
  });

  // User.addHook('beforeCreate',(body,options)=>{
  //       console.log(body.password)
  //       const hash = bcrypt.hashSync(body.password,saltRounds)
  //       console.log(hash)
  //       body.password = hash
  // })


  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
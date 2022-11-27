'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require("./../helpers/hash");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {

    }
  }
  User.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Full name cannot be omitted",
        },
        notEmpty: {
          msg: "Full name cannot be an empty string",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Email cannot be omitted",
        },
        notEmpty: {
          msg: "Email cannot be an empty string",
        },
        isEmail: {
          msg: "Email format wrong",
        },
      },
    },
    password:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be omitted",
        },
        notEmpty: {
          msg: "Password cannot be an empty string",
        },
        is:{
          args:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          msg:"Password minimum delapan karakter, setidaknya satu huruf besar, satu huruf kecil, satu angka dan satu karakter khusus"
        }
      },
    },
    gender:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Gender cannot be omitted",
        },
        notEmpty: {
          msg: "Gender cannot be an empty string",
        },
        isIn: [['male', 'female']], 
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Role cannot be omitted",
        },
        notEmpty: {
          msg: "Role cannot be an empty string",
        },
        isIn: [['admin', 'customer']], 
      },
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Balance cannot be omitted",
        },
        notEmpty: {
          msg: "Balance cannot be an empty string",
        },
        isNumeric: {
          msg: "Balance format must be numeric"
        },
        min: 0,
        max: 100000000,
      },
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hash(user.password);
      },
      beforeValidate(user) {
        user.balance = 0;
        user.role = 'customer';
      },
      afterCreate(user) {
        user.balance = `RP.${user.balance},00`;
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
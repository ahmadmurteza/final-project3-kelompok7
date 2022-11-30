'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require("./../helpers/hash");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {

    }
  }
  Category.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Type cannot be omitted",
        },
        notEmpty: {
          msg: "Type cannot be an empty string",
        },
      },
    },
    sold_product_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Sold-out cannot be omitted",
        },
        notEmpty: {
          msg: "Sold-out cannot be an empty string",
        },
      },
    },
    CreatedAt:  {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Try again",
        },
        notEmpty: {
          msg: "Failed",
        },
      },
    },
    UpdatedAt:  {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Try again",
          },
          notEmpty: {
            msg: "Failed",
          },
        },
      },
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
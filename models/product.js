'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title cannot be omitted",
        },
        notEmpty: {
          msg: "Title cannot be an empty string",
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price cannot be omitted",
        },
        notEmpty: {
          msg: "Price cannot be an empty string",
        },
        isNumeric: {
          msg: "Price format must be numeric"
        },
        min: 0,
        max: 50000000,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price cannot be omitted",
        },
        notEmpty: {
          msg: "Price cannot be an empty string",
        },
        isNumeric: {
          msg: "Price format must be numeric"
        },
        min: 5
      },
    },
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
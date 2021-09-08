// Import dependencies
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Initialize Recipes model by extending off sequelize model class
class Recipes extends Model {}

// create fields/columns for Recipes model
Recipes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nutrition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cook_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingred: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "recipes",
  }
);

// export model
module.exports = Recipes;

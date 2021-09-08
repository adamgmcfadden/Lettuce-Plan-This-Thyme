// import dependencies
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// initialize Calendar model by extending off sequelize model class
class Calendar extends Model {}

// set up fields and rules for Calendar model
Calendar.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1],
      },
    },

    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1],
      },
    },

    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    meal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cook_time: {
      type: DataTypes.INTEGER,
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
    modelName: "calendar",
  }
);

// export model
module.exports = Calendar;

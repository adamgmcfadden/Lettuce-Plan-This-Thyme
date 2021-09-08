// Did not use this model for current app release. May use in future release
// import dependencies
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Initialize Comment model by extending off sequelize model class
class Comment extends Model {}

// set up fields and rules for comment model
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    recipes_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "recipes",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

// export model
module.exports = Comment;

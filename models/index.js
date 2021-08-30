// import all models
const User = require("./User");
const Recipes = require("./Recipes");
const Comment = require("./Comment");

// create associations
User.hasMany(Recipes, {
  foreignKey: "user_id",
});

Recipes.belongsTo(User, {
  foreignKey: "user_id",
});
User.hasMany(Comment, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Comment.belongsTo(Recipes, {
  foreignKey: "recipes_id",
  onDelete: "SET NULL",
});

Recipes.hasMany(Comment, {
  foreignKey: "comment_id",
  onDelete: "SET NULL",
});
module.exports = { User, Recipes, Comment };

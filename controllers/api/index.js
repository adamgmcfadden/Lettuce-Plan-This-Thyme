// --- import dependencies
const router = require("express").Router();

// --- import routes for user and recipes
const userRoutes = require("./user-routes.js");
const recipeRoutes = require("./recipe-routes.js");

// middleware for user and recipe routes
router.use("/users", userRoutes);
router.use("/recipes", recipeRoutes);

// export routes
module.exports = router;

//  import dependencies
const router = require("express").Router();

// import all routes
const homeRoutes = require("./home-routes.js");
const apiRoutes = require("./api");
const dashboardRoutes = require("./dashboard-routes.js");
const calendarRoutes = require("./calendar-routes.js");

// middleware for routes
router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/calendar", calendarRoutes);

// export routes to use in server.js
module.exports = router;

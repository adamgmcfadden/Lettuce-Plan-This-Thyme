const router = require("express").Router();

const homeRoutes = require("./home-routes.js");
const apiRoutes = require("./api");
const dashboardRoutes = require("./dashboard-routes.js");
const calendarRoutes = require("./calendar-routes.js");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/calendar", calendarRoutes);

module.exports = router;

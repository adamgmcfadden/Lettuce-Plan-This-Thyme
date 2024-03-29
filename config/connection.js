//--- Import dependencies ---
const Sequelize = require("sequelize");

//--- hide credentials with dotenv
require("dotenv").config();

// create connection to our db
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

// export db connection to be used in server.js
module.exports = sequelize;

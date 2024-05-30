const UnSQL = require("unsql");
const pool = require("../services/db.service");
const table_name = process.env.DB_CO_PASSENGER_TABLE;

class CoPassenger extends UnSQL {
  static POOL = pool;
  static TABLE_NAME = table_name;
}

module.exports = CoPassenger;

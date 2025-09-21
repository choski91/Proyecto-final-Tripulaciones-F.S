const pool = require("../config/sqlConfig");
const queries = require("../utils/queries"); // Queries SQL

const getAlert = async () => {
  const result = await pool.query(queries.getAlert);
  return result.rows;
};

module.exports = {
  getAlert,
};
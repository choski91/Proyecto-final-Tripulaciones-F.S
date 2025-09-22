const pool = require("../config/sqlConfig");
const queries = require("../utils/queries");

const getAlert = async () => {
  const result = await pool.query(queries.getAlert);
  return result.rows;
};

const getAlertPhishing = async () => {
  const result = await pool.query(queries.getAlertPhishing);
  return result.rows;
};

module.exports = { getAlert, getAlertPhishing };
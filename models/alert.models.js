const pool = require("../config/sqlConfig");
const queries = require("../utils/queries");

const getLoginAlert = async () => {
  const result = await pool.query(queries.getAlertLogin);
  return result.rows;
};

const getAlertPhishing = async () => {
  const result = await pool.query(queries.getAlertPhishing);
  return result.rows;
};

const getAllAlerts = async () => {
  const result = await pool.query(queries.getAllAlerts);
  return result.rows;
};

const getAlertDdos = async () => {
  const result = await pool.query(queries.getAlertDdos);
  return result.rows;
};

const getAlertDos = async () => {
  const result = await pool.query(queries.getAlertDos);
  return result.rows;
};

const getAlertFuerzaBruta = async () => {
  const result = await pool.query(queries.getAlertFuerzaBruta);
  return result.rows;
};

module.exports = {
  getAlertPhishing,
  getAlertDdos,
  getAlertDos,
  getAlertFuerzaBruta,
  getAllAlerts,
  getLoginAlert
};

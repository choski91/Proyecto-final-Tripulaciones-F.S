const pool = require("../config/sqlConfig");
const queries = require("../utils/queries");

const createUser = async (nombre, cif, email, password) => {
  const result = await pool.query(queries.createUser, [nombre, cif, email, password]);
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await pool.query(queries.getUserByEmail, [email]);
  return result.rows[0];
};

module.exports = {
  createUser,
  getUserByEmail,
};

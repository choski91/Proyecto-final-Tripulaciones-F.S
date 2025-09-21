const pool = require("../config/sqlConfig");
const queries = require("../utils/queries"); // Queries SQL

const createUser = async (name, email, hashed_password) => {
  const result = await pool.query(queries.createUser, [name, email, hashed_password]);
  return result;
};

module.exports = {
  createUser,
};
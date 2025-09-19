const queries = {
      // USERS
  getUserById: `SELECT * FROM users WHERE id=$1;`,
  getUserByEmail: `SELECT * FROM users WHERE email=$1;`,
  createUser: `INSERT INTO users (name, email, hashed_password)
            VALUES ($1,$2,$3);`,
}

module.exports = queries;
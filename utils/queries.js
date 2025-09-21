const queries = {
      // USERS
  getUserById: `SELECT * FROM users WHERE id=$1;`,
  getUserByEmail: `SELECT * FROM users WHERE email=$1;`,
  createUser: `INSERT INTO users (name, email, hashed_password)
            VALUES ($1,$2,$3);`,

    //Alert
    getAlert: `SELECT * FROM alertas_login_sospechoso;`,

    //PHISHING
    getAlertPhishing: `SELECT * FROM alertas_phishing;`,
}

module.exports = queries;